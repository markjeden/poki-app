import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import Back from "./../../assets/images/back.png";
import { useForm, Controller } from "react-hook-form";
import { VerifyOtpAPI } from "../../store/actions/auth";

export default function EmailVerificationScreen({ navigation, route }) {
  const { email } = route.params;

  // React Hook Form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  // Submit OTP
  const onSubmit = async (data: any) => {
    const { otp } = data;
    console.log("Entered OTP:", otp);

    try {
      const response = await VerifyOtpAPI({ otp, email });
      console.log("Registration successful:", response);
      
      navigation.navigate('login');

      // navigation.navigate('home');
    } catch (err) {
      
    }
  };

  // Resend OTP
  const handleResend = () => {
    // Replace with API call to resend OTP
    Alert.alert("Resent", "Verification code has been resent to your email.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Header */}
      <View style={styles.pageTitleContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>EMAIL VERIFICATION</Text>
      </View>

      {/* Content */}
      <View style={styles.innercontainer}>
        <Text style={styles.title}>GET YOUR CODE</Text>
        <Text style={styles.description}>
          Please Enter The 4 Digit Code That Was Sent To Your Email Address.
        </Text>

        {/* OTP Input */}
        <Controller
          control={control}
          name="otp"
          rules={{
            required: "OTP is required",
            minLength: { value: 4, message: "OTP must be 4 digits" },
            maxLength: { value: 4, message: "OTP must be 4 digits" },
            pattern: { value: /^[0-9]{4}$/, message: "OTP must be numeric" }
          }}
          render={({ field: { onChange, value } }) => (
            <OTPTextView
              inputCount={4}
              handleTextChange={onChange}
              defaultValue={value}
              inputCellLength={1}
              containerStyle={{ marginVertical: 10 }}
              textInputStyle={{
                backgroundColor: "#1689FE1F",
                borderBottomWidth: 0,
                width: 54,
                height: 45,
                borderRadius: 10,
                color: "#fff",
                fontSize: 18,
                textAlign: "center",
              }}
            />
          )}
        />
        {errors.otp && <Text style={styles.errorText}>{errors.otp.message}</Text>}

        {/* Resend Note */}
        <View style={styles.note}>
          <Text style={styles.text}>If You Don't Receive Code! </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.linkText}>Resend</Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>VERIFY AND PROCEED</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14135F",
    padding: 15,
    paddingTop: 50,
    flexGrow: 1,
  },
  pageTitleContainer: {
    position: "relative",
    marginBottom: 15,
  },
  pageTitle: {
    color: "#1689FE",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
  innercontainer: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    width: 25,
    height: 25,
    position: "absolute",
    zIndex: 999,
  },
  back: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    lineHeight: 18,
    marginBottom: 5,
    fontWeight: "600",
  },
  description: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    lineHeight: 18,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#2ea8ff",
    paddingVertical: 15,
    width: "75%",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  note: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 8,
    color: "#fff",
  },
  linkText: {
    fontSize: 8,
    color: "#2ea8ff",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "center",
  },
});
