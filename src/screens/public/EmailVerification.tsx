import React, { useState, useEffect } from "react";
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
import LeftArrow from "./../../assets/images/left-arrow.png";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type VerificationFormData = {
  code: string;
};

const CODE_REGEX = /^\d{4}$/;

function EmailVerification(): React.JSX.Element {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(60);

  const { 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<VerificationFormData>({
    defaultValues: {
      code: "",
    }
  });

  const codeValue = watch("code");
  const isValidCode = CODE_REGEX.test(codeValue || "");

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  // Format seconds to 00:00
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const onSubmit = (data: VerificationFormData) => {
    console.log("Verification Code:", data.code);

    navigation.navigate('reset-your-password');
  };

  const handleResend = () => {
    setSeconds(60); // Reset timer
    console.log("Code Resent");
  };

  return (
    <ImageBackground source={Bg} style={styles.wrapper}>
      <View style={styles.roleTitleView}>
        <View style={styles.roleTitleBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} style={styles.leftArrowImage} />
          </TouchableOpacity>
          <Text style={styles.roleTitle}>Enter 4 digit code</Text>
        </View>
        
        <Text style={styles.roleSubTitle}>
          Enter 4 digit code that your receive on your {'\n'}email (henry.thomas@gmail.com).
        </Text>
      </View>

      {/* 4-Digit Code Input Section */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Verification Code*</Text>
        <Controller
          control={control}
          name="code"
          rules={{ 
            required: "Code is required",
            pattern: {
              value: CODE_REGEX,
              message: "Please enter a valid 4-digit code"
            },
            maxLength: 4
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="0000"
              placeholderTextColor="#aaa"
              keyboardType="number-pad"
              maxLength={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.code && <Text style={styles.error}>{errors.code.message}</Text>}
      </View>

      {/* Resend */}
      <View style={styles.row}>
        <View style={styles.subrow}>
          <Text style={styles.subtext}>Email not received?</Text>
        </View>
        <TouchableOpacity onPress={() => handleResend()}>
          <Text style={styles.resendcode}>Resend code</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Button with Timer */}
      <View style={styles.buttonView}>
        <TouchableOpacity 
          style={[styles.button, !isValidCode && { opacity: 0.8 }]} 
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>
            {isValidCode ? "Verify Code" : `Continue (${formatTime(seconds)})`}
          </Text>
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
  roleTitleView: {
    marginTop: screenHeight * 0.1,
  },
  roleTitleBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftArrowImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  roleTitle: {
    color: '#fff',
    fontFamily: 'Clash Display',
    fontSize: screenWidth * 0.06,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
    flex: 1,
    marginRight: 24,
  },
  roleSubTitle: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    marginTop: screenHeight * 0.03,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputWrapper: {
    marginTop: screenHeight * 0.05,
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
    fontSize: screenWidth * 0.05,
    letterSpacing: 10,
    textAlign: 'center',
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
  },
  signupText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: screenWidth * 0.03,
    marginTop: screenHeight * 0.02,
  },
  signupLink: {
    color: "#FFD748",
    fontWeight: 'bold',
  },
  error: {
    color: "#ff5c5c",
    fontSize: screenWidth * 0.03,
    marginVertical: screenHeight * 0.005,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: screenHeight * 0.015,
  },
  subrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtext: {
    color: '#fff',
    fontSize: screenWidth * 0.03,
    marginLeft: screenWidth * 0.02,
  },
  resendcode: {
    color: '#fff',
    fontSize: screenWidth * 0.03,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});

export default EmailVerification;