import axios from 'axios';
import { routes } from './Constants';
import { store } from '../store/store';
import { showError, showSuccess } from './Helper';
import { setLoader } from '../store/reducers/auth';

const API = axios.create({ baseURL: routes.baseUrl });

// 🛰️ REQUEST INTERCEPTOR
API.interceptors.request.use(config => {
  const { auth: { token } } = store.getState();

  config.headers['Authorization'] = `Bearer ${token}`;
  config.headers['token'] = token;

  const fullUrl = `${config.baseURL.replace(/\/$/, '')}/${config.url.replace(/^\//, '')}`;
  console.log('📡 Sending request to:', fullUrl);

//   if (config.method === 'get') store.dispatch(setLoader(true));

    store.dispatch(setLoader(true));

  return config;
});

// 🧾 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => {
    store.dispatch(setLoader(false));

    const { toast, message: customMsg } = response.config;
    const message = customMsg || response?.data?.message;

    if (toast && message) showSuccess(message);

    return response;
  },

  (error) => {
    store.dispatch(setLoader(false));

    const errResponse = error?.response;

    if (errResponse?.data) {
      const data = errResponse.data;

      // ✅ Extract error message safely
      const errorMessage =
        data?.errorData?.message || // case: { errorData: { message: "..." } }
        data?.message ||             // case: { message: "..." }
        data?.error ||               // case: { error: "..." }
        errResponse?.statusText ||   // fallback to HTTP text
        'Something went wrong';

      showError(errorMessage);
    } else {
      showError('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

export default API;
