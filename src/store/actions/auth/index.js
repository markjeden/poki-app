import API from '../../../utils/API';
import { routes } from '../../../utils/Constants';
import { setUserDetails, setToken } from '../../reducers/auth';
import { store } from '../../store';

// Register API
export const RegisterAPI = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('routes.register', routes.register);
    API.post(routes.register, data, {
      toast: true,
      message: 'Registration successful! Please check your email for verification.',
    })
    .then(e => {
      const response = e?.data?.data;
      console.log('response', response);
      resolve(response);
    })
    .catch(err => {
      const status = err?.response?.status;
      const errorData = err?.response?.data;
      console.log('RegisterAPI err', { status, errorData });
      reject({ status, errorData });
    });
  });
};

// Login API
export const LoginAPI = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('routes.login', routes.login);
    API.post(routes.login, data, {
      toast: true,
      message: 'Login Successfully!',
    })
    .then(e => {
      const response = e?.data?.data;
      console.log('response', response);
      store.dispatch(setUserDetails(response));
      store.dispatch(setToken(response?.token));
      resolve(response);
    })
    .catch(err => {
      const status = err?.response?.status;
      const errorData = err?.response?.data;
      console.log('LoginAPI err', { status, errorData });
      reject({ status, errorData });
    });
  });
};

// Forgot Password API
export const ForgotPasswordAPI = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('routes.forgotPassword', routes.forgotPassword);
    API.post(routes.forgotPassword, data, {
      toast: true,
      message: 'OTP sent to your email for password reset.',
    })
    .then(e => {
      const response = e?.data?.data;
      console.log('response', response);
      resolve(response);
    })
    .catch(err => {
      const status = err?.response?.status;
      const errorData = err?.response?.data;
      console.log('ForgotPasswordAPI err', { status, errorData });
      reject({ status, errorData });
    });
  });
};

// Verify OTP API
export const VerifyOtpAPI = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('routes.verifyEmail', routes.verifyEmail);
    API.post(routes.verifyEmail, data, {
      toast: true,
      message: 'OTP verified successfully.',
    })
    .then(e => {
      const response = e?.data?.data;
      console.log('response', response);
      resolve(response);
    })
    .catch(err => {
      const status = err?.response?.status;
      const errorData = err?.response?.data;
      console.log('VerifyOtpAPI err', { status, errorData });
      reject({ status, errorData });
    });
  });
};

// Reset Password API
export const ResetPasswordAPI = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('routes.resetPassword', routes.resetPassword);
    API.post(routes.resetPassword, data, {
      toast: true,
      message: 'Password reset successfully.',
    })
    .then(e => {
      const response = e?.data?.data;
      console.log('response', response);
      resolve(response);
    })
    .catch(err => {
      const status = err?.response?.status;
      const errorData = err?.response?.data;
      console.log('ResetPasswordAPI err', { status, errorData });
      reject({ status, errorData });
    });
  });
};
