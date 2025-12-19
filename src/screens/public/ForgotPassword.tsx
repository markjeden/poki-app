import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';

import Bg from "./../../assets/images/bg-light.png";
import WelcomeImage from "./../../assets/images/logo.png";
import LeftArrow from "./../../assets/images/left-arrow.png"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type LoginFormData = {
  email: string;
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Login(): React.JSX.Element {
  const navigation = useNavigation();
  const { 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
    }
  });

  const emailValue = watch("email");
  const isValidEmail = EMAIL_REGEX.test(emailValue || "");

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);

    navigation.navigate('email-verification');
  };

  return (
    <ImageBackground source={Bg} style={styles.wrapper}>
      {/* <View style={styles.titleView}>
        <Image source={WelcomeImage} style={styles.titleImage} />
        <Text style={styles.titleText}>PokiStock</Text>
      </View> */}

      <View style={styles.roleTitleView}>
        <View style={styles.roleTitleBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} style={styles.leftArrowImage} />
          </TouchableOpacity>
          <Text style={styles.roleTitle}>forgot password</Text>
        </View>
        
        <Text style={styles.roleSubTitle}>Enter your email for the verification process, {'\n'}we will send 4 digit to your email</Text>
      </View>

      {/* Email Input Section */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Email Address*</Text>
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email address"
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input, 
                // Optional: Change border color when valid
                // isValidEmail && { borderColor: '#48FF8E' } 
              ]}
              placeholder="Enter email address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {/* Dynamic Error Message */}
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>


      {/* Login Button */}
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{isValidEmail ? "Send Code" : "Continue"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.signupText}>
          Back To <Text style={styles.signupLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleImage: {
    width: screenWidth * 0.15,
    height: screenHeight * 0.07,
    resizeMode: 'contain',
  },
  titleText: {
    color: '#fff',
    fontFamily: 'Clash Display',
    fontSize: screenWidth * 0.08,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginLeft: screenWidth * 0.02,
    top: screenHeight * 0.006,
  },
  roleTitleView: {
    marginTop: screenHeight * 0.1,
  },
  roleTitleBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftArrowImage: {

  },
  roleTitle: {
    color: '#fff',
    fontFamily: 'Clash Display',
    fontSize: screenWidth * 0.06,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
    flex: 1
  },
  roleSubTitle: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    marginTop: screenHeight * 0.03,
    textAlign: 'center',
  },
  inputWrapper: {
    marginTop: screenHeight * 0.03,
  },
  inputText: {
    color: '#fff',
    fontSize: screenWidth * 0.035,
    marginBottom: screenHeight * 0.01,
    fontFamily: 'Poppins',
  },
  input: {
    borderRadius: screenWidth * 0.01,
    borderWidth: 1,
    borderColor: "#FFD748",
    backgroundColor: 'rgba(15,15,15,0.08)',
    height: screenHeight * 0.07,
    paddingHorizontal: screenWidth * 0.05,
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.035,
  },
  passwordWrapper: {
    marginTop: screenHeight * 0.03,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFD748",
    borderWidth: 1,
    borderRadius: screenWidth * 0.01,
    backgroundColor: 'rgba(15,15,15,0.08)',
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    height: screenHeight * 0.07,
    paddingHorizontal: screenWidth * 0.05,
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.035,
  },
  eyeButton: {
    paddingHorizontal: screenWidth * 0.03,
  },
  eyeImage: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: screenHeight * 0.015,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    color: '#fff',
    fontSize: screenWidth * 0.03,
    marginLeft: screenWidth * 0.02,
  },
  forgotText: {
    color: '#fff',
    fontSize: screenWidth * 0.03,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  buttonView: {
    marginTop: screenHeight * 0.03,
  },
  button: {
    width: '100%',
    paddingVertical: screenHeight * 0.02,
    borderRadius: screenWidth * 0.13,
    borderWidth: 2,
    borderColor: '#FFD748',
    backgroundColor: '#010000',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: screenWidth * 0.045,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  orText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    marginVertical: screenHeight * 0.025,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: screenWidth * 0.05,
    marginBottom: screenHeight * 0.02,
  },
  socialButton: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderRadius: screenWidth * 0.06,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  socialImage: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
    resizeMode: 'contain',
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: screenWidth * 0.03,
    marginTop: screenHeight * 0.02,
  },
  signupLink: {
    color: "#FFD748",
  },
  error: {
    color: "#ff5c5c",
    fontSize: screenWidth * 0.03,
    marginVertical: screenHeight * 0.005,
  },
});

export default Login;
