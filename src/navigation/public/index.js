import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { screens } from '../../utils/Constants';
import Welcome from '../../screens/public/Welcome';
import Login from '../../screens/public/Login';
import Register from '../../screens/public/Register';
import ForgotPassword from '../../screens/public/ForgotPassword';
import Home from '../../screens/private/Home';
import EmailVerificationScreen from '../../screens/public/EmailVerification';
import ResetYourPasswordScreen from '../../screens/public/ResetYourPassword';
import GetStarted from '../../screens/public/GetStarted';
import ChooseYourRole from '../../screens/public/ChooseYourRole';
import SignupCollector from '../../screens/public/SignupCollector';
import SignupCreator from '../../screens/public/SignupCreator';
import SignupVendor from '../../screens/public/SignupVendor';

const Stack = createNativeStackNavigator();

const PublicNavigation = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'welcome'}>
          <Stack.Screen name={'welcome'} component={Welcome} />
          <Stack.Screen name={'get-started'} component={GetStarted} />
          <Stack.Screen name={'choose-your-role'} component={ChooseYourRole} />
          <Stack.Screen name={'signup-collector'} component={SignupCollector} />
          <Stack.Screen name={'signup-creator'} component={SignupCreator} />
          <Stack.Screen name={'signup-vendor'} component={SignupVendor} />

          <Stack.Screen name={'login'} component={Login} />
          <Stack.Screen name={'register'} component={Register} />
          <Stack.Screen name={'forgot-password'} component={ForgotPassword} />
          <Stack.Screen name={'email-verification'} component={EmailVerificationScreen} />
          <Stack.Screen name={'reset-your-password'} component={ResetYourPasswordScreen} />
          <Stack.Screen name={'home'} component={Home} />
      </Stack.Navigator>
    </>
  );
};

export default PublicNavigation;