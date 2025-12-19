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
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';

import Bg from "./../../assets/images/bg-light.png";
import LeftArrow from "./../../assets/images/left-arrow.png";
import Eyeslash from "./../../assets/images/eye-slash.png";
import CheckMark from "./../../assets/images/check-mark.png";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type ResetYourPasswordFormData = {
  password: string;
  confirmPassword: string;
};

function ResetYourPassword(): React.JSX.Element {
  const navigation = useNavigation();
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<ResetYourPasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const passwordsMatch = passwordValue === confirmPasswordValue && passwordValue !== "";

  const onSubmit = (data: ResetYourPasswordFormData) => {
    console.log("New Password Data:", data);
    setModalVisible(true);
  };

  const handleModalAction = () => {
    setModalVisible(false);
    navigation.navigate('login' as never);
  };

  return (
    <ImageBackground source={Bg} style={styles.wrapper}>
      <View style={styles.roleTitleView}>
        <View style={styles.roleTitleBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} style={styles.leftArrowImage} />
          </TouchableOpacity>
          <Text style={styles.roleTitle}>Create New password</Text>
        </View>
        <Text style={styles.roleSubTitle}>
          set a new password for your account.
        </Text>
      </View>

      {/* New Password Input */}
      <View style={styles.passwordWrapper}>
        <Text style={styles.inputText}>New Password*</Text>
        <View style={styles.passwordBox}>
          <Controller
            control={control}
            name="password"
            rules={{ 
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter new password"
                placeholderTextColor="#aaa"
                secureTextEntry={secure}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setSecure(!secure)}>
            <Image source={Eyeslash} style={styles.eyeImage} />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>

      {/* Confirm Password Input */}
      <View style={styles.passwordWrapper}>
        <Text style={styles.inputText}>Confirm Password*</Text>
        <View style={styles.passwordBox}>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{ 
              required: "Please confirm your password",
              validate: (value) => value === passwordValue || "Passwords do not match"
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm new password"
                placeholderTextColor="#aaa"
                secureTextEntry={confirmSecure}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setConfirmSecure(!confirmSecure)}>
            <Image source={Eyeslash} style={styles.eyeImage} />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
      </View>

      {/* Main Update Button */}
      <View style={styles.buttonView}>
        <TouchableOpacity 
          style={[styles.button, !passwordsMatch && { opacity: 0.8 }]} 
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login' as never)}>
        <Text style={styles.signupText}>
          Back To <Text style={styles.signupLink}>Login</Text>
        </Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successCircle}>
              <Image source={CheckMark} />
            </View>
            
            <Text style={styles.modalTitleText}>
                Password updated {'\n'}Successfully!
            </Text>

            <TouchableOpacity 
                style={styles.modalButton} 
                onPress={handleModalAction}
            >
              <Text style={styles.modalButtonText}>UPDATE PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    textTransform: 'capitalize'
  },
  inputText: {
    color: '#fff',
    fontSize: screenWidth * 0.035,
    marginBottom: screenHeight * 0.01,
    fontFamily: 'Poppins',
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
  buttonView: {
    marginTop: screenHeight * 0.04,
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
    marginTop: 5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#000000a1',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: screenWidth * 0.08,
    paddingTop: 50,
    paddingBottom: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 72, 0.2)',
  },
  successCircle: {
   
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkMark: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '300',
  },
  modalTitleText: {
    color: '#fff',
    fontSize: screenWidth * 0.055,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Clash Display',
  },
  modalButton: {
    width: '100%',
    paddingVertical: screenHeight * 0.02,
    borderRadius: screenWidth * 0.13,
    borderWidth: 2,
    borderColor: '#FFD748',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: screenWidth * 0.04,
    fontWeight: '800',
  },
});

export default ResetYourPassword;