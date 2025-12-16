import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { RegisterAPI } from "../../store/actions/auth";
import LogoBig from "./../../assets/images/big-logo.png";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, setError, watch } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const passwordValue = watch("password"); // For password confirmation validation

  // On register submit
  const onRegisterAction = async (data) => {
    console.log('data', data)
    const { email, password, password_confirmation, region } = data;

    try {
      const response = await RegisterAPI({ email, password, password_confirmation, region });  // API call
      console.log("Registration successful:", response);
      // navigation.navigate('home', { country: region });

      navigation.navigate('email-verification', { email: email });
    } catch (err) {
      console.log("Registration error:", err);
      // setError("email", { type: "manual", message: "Email is already taken or invalid" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Logo */}
      <Image source={LogoBig} style={styles.logo} />

      <Text style={styles.slogan}>
        "COMPASSION, COMFORT, CONNECTION"
      </Text>

      <View style={styles.innercontainer}>
        <Text style={styles.description}>
          Welcome to the Emotional Support Animals Registry! Your trusted platform for managing your ESA documentation and membership.
        </Text>

        <TouchableOpacity style={styles.memberBtn} onPress={() => navigation.navigate('login')}>
          <Text style={styles.memberBtnText}>MEMBER LOGIN</Text>
        </TouchableOpacity>

        {/* Email */}
        <Text style={styles.label}>EMAIL*</Text>
        <Controller
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              // placeholder="example@example.com"
              // placeholderTextColor="#fff"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        {/* Password */}
        <Text style={styles.label}>PASSWORD*</Text>
        <Controller
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.passwordBox}>
              <TextInput
                // placeholder="***********"
                // placeholderTextColor="#fff"
                secureTextEntry={!passwordVisible}
                style={styles.inputPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ?
                  <Image style={styles.eyeIcon} source={require('./../../assets/images/close-eye.png')} /> :
                  <Image style={styles.eyeIcon} source={require('./../../assets/images/open-eye.png')} />
                }
              </TouchableOpacity>
            </View>
          )}
          name="password"
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {/* Password Confirmation */}
        <Text style={styles.label}>CONFIRM PASSWORD*</Text>
        <Controller
          control={control}
          rules={{
            required: "Password confirmation is required",
            validate: value => value === passwordValue || "Passwords do not match"
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.passwordBox}>
              <TextInput
                // placeholder="***********"
                // placeholderTextColor="#fff"
                secureTextEntry={!confirmPasswordVisible}
                style={styles.inputPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                {confirmPasswordVisible ?
                  <Image style={styles.eyeIcon} source={require('./../../assets/images/close-eye.png')} /> :
                  <Image style={styles.eyeIcon} source={require('./../../assets/images/open-eye.png')} />
                }
              </TouchableOpacity>
            </View>
          )}
          name="password_confirmation"
        />
        {errors.password_confirmation && <Text style={styles.errorText}>{errors.password_confirmation.message}</Text>}

        {/* Region */}
        <Text style={styles.label}>REGION*</Text>
        <Controller
          control={control}
          name="region"
          rules={{ required: "Region is required" }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={styles.picker}
                dropdownIconColor="#fff"
              >
                <Picker.Item style={styles.pickerItemText} label="Select Your Region" value="" />
                <Picker.Item style={styles.pickerItemText} label="USA" value="usa" />
                <Picker.Item style={styles.pickerItemText} label="EU" value="eu" />
                <Picker.Item style={styles.pickerItemText} label="UK" value="uk" />
              </Picker>
            </View>
          )}
        />
        {errors.region && <Text style={styles.errorText}>{errors.region.message}</Text>}

        {/* Register Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onRegisterAction)}>
          <Text style={styles.loginBtnText}>REGISTER</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('forgot-password')}>
          <Text style={styles.forgotText}>FORGOT PASSWORD</Text>
        </TouchableOpacity> */}
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#14135F",
  },
  innercontainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginHorizontal: 'auto'
  },
  slogan: {
    backgroundColor: "#1689FE",
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
    padding: 10
  },
  description: {
    color: "#d3e4ff",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  memberBtn: { 
    backgroundColor: "#1689FE", 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    marginBottom: 20, 
  }, 
  memberBtnText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 10, 
  },
  label: {
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 12,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#1689FE1F",
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 5,
    fontSize: 12,
  },
  passwordBox: {
    backgroundColor: "#1689FE1F",
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputPassword: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
  },
  pickerContainer: {
    backgroundColor: "#1689FE1F",
    borderRadius: 8,
    width: "100%",
    paddingLeft: 15,
    fontSize: 12,
    color: "#fff",
    // marginBottom: 20,
  },
  picker: {
    width: "100%",
    borderRadius: 8,
    color: "#fff",
    fontSize: 12,
  },
  pickerItemText: {
    fontSize: 12,
  },
  loginBtn: {
    backgroundColor: "#2ea8ff",
    paddingVertical: 15,
    width: "50%",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 20,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  forgotText: {
    color: "#8fbaff",
    marginTop: 5,
    fontSize: 12,
  },
  eyeIcon: {
    paddingHorizontal: 8,
    width: 20,
    resizeMode: 'contain'
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});
