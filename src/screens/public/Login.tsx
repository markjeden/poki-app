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
import RingSwitch from "../../components/RingSwitch";

import Bg from "./../../assets/images/bg-light.png";
import WelcomeImage from "./../../assets/images/logo.png";
import Google from "./../../assets/images/google.png";
import Apple from "./../../assets/images/apple.png";
import Eyeslash from "./../../assets/images/eye-slash.png";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

function Login(): React.JSX.Element {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [secure, setSecure] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <ImageBackground source={Bg} style={styles.wrapper}>
      <View style={styles.titleView}>
        <Image source={WelcomeImage} style={styles.titleImage} />
        <Text style={styles.titleText}>PokiStock</Text>
      </View>

      <View style={styles.roleTitleView}>
        <Text style={styles.roleTitle}>login</Text>
        <Text style={styles.roleSubTitle}>Sign in to your account</Text>
      </View>

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Email Address*</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor="#fff"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.email && <Text style={styles.error}>Email is required</Text>}

      {/* Password Input */}
      <View style={styles.passwordWrapper}>
        <Text style={styles.inputText}>Password*</Text>
        <View style={styles.passwordBox}>
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                placeholderTextColor="#fff"
                secureTextEntry={secure}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setSecure(!secure)}
          >
            <Image source={Eyeslash} style={styles.eyeImage} />
          </TouchableOpacity>
        </View>
      </View>
      {errors.password && <Text style={styles.error}>Password is required</Text>}

      {/* Remember Me / Forgot */}
      <View style={styles.row}>
        <View style={styles.rememberRow}>
          <RingSwitch value={enabled} onChange={setEnabled} />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('forgot-password')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Or Sign Up With</Text>

      {/* Social Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={Google} style={styles.socialImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={Apple} style={styles.socialImage} />
        </TouchableOpacity>
      </View>

      <Text style={styles.signupText}>
        Not a user? <Text style={styles.signupLink}>Sign up</Text>
      </Text>
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
    marginTop: screenHeight * 0.03,
  },
  roleTitle: {
    color: '#fff',
    fontFamily: 'Clash Display',
    fontSize: screenWidth * 0.06,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  roleSubTitle: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    marginTop: screenHeight * 0.01,
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
