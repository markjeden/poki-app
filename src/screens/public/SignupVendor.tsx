import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';  // <-- add this dependency in your project!

import Bg from "./../../assets/images/bg-light.png";
import WelcomeImage from "./../../assets/images/logo.png";

import Eyeslash from "./../../assets/images/eye-slash.png";
import Vendor from "./../../assets/images/vendor.png";
import { screenHeight } from "../../utils/Constants";

const { width: screenWidth } = Dimensions.get("window");

type SignupVendorFormData = {
  name: string;
  email: string;
  password: string;
  location: string;
  website: string;
  businessType: string;
};

function Checkbox({ checked, onPress }: { checked: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.checkbox, checked && styles.checkboxChecked]} onPress={onPress}>
      {checked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
  );
}

function SignupVendor(): React.JSX.Element {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm<SignupVendorFormData>();
  const [secure, setSecure] = useState(true);
  const [sealed, setSealed] = useState(false);
  const [singleCards, setSingleCards] = useState(false);
  const [gradingServices, setGradingServices] = useState(false);
  const [vintageCards, setVintageCards] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const onSubmit = (data: SignupVendorFormData) => {
    console.log("Signup Data:", data);
  };

  const urlPattern = /^(https?:\/\/)?([\w\-]+)+([\w\-./?%&=]*)?$/i;

  return (
    <ImageBackground source={Bg} style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleView}>
          <Image source={WelcomeImage} style={styles.titleimage} />
          <Text style={styles.titletext}>PokiStock</Text>
        </View>

        <View style={styles.roleTitleView}>
          <Text style={styles.roleTitle}>Sign Up as Vendor</Text>
          <Text style={styles.roleSubTitle}>
            Manage inventory, go live with restocks, {'\n'}and grow your business.
          </Text>
        </View>

        <View style={styles.cardcontainer}>
          <TouchableOpacity activeOpacity={0.85} style={[styles.card, styles.cardSelected]}>
            <View style={styles.iconBox}>
              <Image source={Vendor} style={styles.iconBoxImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Vendor</Text>
              <Text style={styles.description}>Account Type</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Full Name / Business Name*</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Your Full Name"
                placeholderTextColor="#fff"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && <Text style={styles.error}>Name is required</Text>}
        </View>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>email address*</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter Email Address"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <Text style={styles.error}>Email is required</Text>}
        </View>

        {/* Password */}
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
                  placeholder="Create a Strong Password"
                  placeholderTextColor="#fff"
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
          {errors.password && <Text style={styles.error}>Password is required</Text>}
        </View>

        {/* Location */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Location*</Text>
          <Controller
            control={control}
            name="location"
            rules={{ required: "Location is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="(City, UK)"
                placeholderTextColor="#fff"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.location && <Text style={styles.error}>{errors.location.message}</Text>}
        </View>

        {/* Website */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Website*</Text>
          <Controller
            control={control}
            name="website"
            rules={{
              required: "Website is required",
              pattern: {
                value: urlPattern,
                message: "Enter a valid website URL",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="(https://yourwebsite.co.uk)"
                placeholderTextColor="#fff"
                keyboardType="url"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.website && <Text style={styles.error}>{errors.website.message}</Text>}
        </View>

        {/* Business Type */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Business Type*</Text>
          <Controller
            control={control}
            name="businessType"
            rules={{ required: "Business type is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  dropdownIconColor="#FFD748"
                  selectedValue={value}
                  onValueChange={onChange}
                  mode="dropdown"
                >
                  <Picker.Item label="Select your business type" value="" color="#ccc" />
                  <Picker.Item label="Retail" value="retail" />
                  <Picker.Item label="Wholesale" value="wholesale" />
                  <Picker.Item label="Online" value="online" />
                  <Picker.Item label="Distributor" value="distributor" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            )}
          />
          {errors.businessType && <Text style={styles.error}>{errors.businessType.message}</Text>}
        </View>

        {/* Specialties */}
        <View style={styles.container}>
          <Text style={styles.heading}>Specialties*</Text>

          <View style={styles.optionRow}>
            <Checkbox checked={sealed} onPress={() => setSealed(!sealed)} />
            <Text style={styles.optionText}>Sealed Products</Text>
          </View>

          <View style={styles.optionRow}>
            <Checkbox checked={singleCards} onPress={() => setSingleCards(!singleCards)} />
            <Text style={styles.optionText}>Single Cards</Text>
          </View>

          <View style={styles.optionRow}>
            <Checkbox checked={gradingServices} onPress={() => setGradingServices(!gradingServices)} />
            <Text style={styles.optionText}>Grading Services</Text>
          </View>

          <View style={styles.optionRow}>
            <Checkbox checked={vintageCards} onPress={() => setVintageCards(!vintageCards)} />
            <Text style={styles.optionText}>Vintage Cards</Text>
          </View>

          <View style={[styles.optionRow, { marginTop: 20 }]}>
            <Checkbox checked={agreed} onPress={() => setAgreed(!agreed)} />
            <Text style={[styles.optionText, { flexShrink: 1 }]}>
              I agree to the Terms of Service and Privacy Policy.
            </Text>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}

const CHECKBOX_SIZE = screenWidth * 0.04;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#000000ff",
    flex: 1,
    // padding: 40,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleimage: {
    width: 63.824,
    height: 55.49,
    resizeMode: "contain",
  },
  titletext: {
    color: "#fff",
    fontFamily: "Clash Display",
    fontSize: 31.963,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 33.218,
    textTransform: "uppercase",
    position: "relative",
    top: 5,
    left: 5,
  },
  roleTitleView: {
    marginTop: 34,
  },
  roleTitle: {
    color: "#fff",
    fontFamily: "Clash Display",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
  roleSubTitle: {
    color: "#fff",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 11.923,
    marginTop: 9,
    textAlign: "center",
  },
  buttonView: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  button: {
    padding: 18.751,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 53.106,
    borderWidth: 2,
    borderColor: "#FFD748",
    backgroundColor: "#010000",
    width: "100%",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Clash Display",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 16,
    textTransform: "uppercase",
  },
  inputText: {
    color: "#FFFFFF",
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "400",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  inputWrapper: {
    marginTop: 24,
  },
  input: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#FFD748",
    backgroundColor: "rgba(15, 15, 15, 0.08)",
    height: 55,
    paddingHorizontal: 20,
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 14,
    opacity: 0.85,
  },
  passwordWrapper: {
    marginTop: 27,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFD748",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "rgba(15, 15, 15, 0.08)",
    opacity: 0.85,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    height: 55,
    paddingHorizontal: 20,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 14,
  },
  eyeButton: {
    paddingHorizontal: 14,
  },
  eyeImage: {
    width: 20,
    resizeMode: "contain",
  },
  container: {
    paddingVertical: 20,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "600",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  checkboxInner: {
    width: CHECKBOX_SIZE * 0.5,
    height: CHECKBOX_SIZE * 0.5,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  cardcontainer: {
    marginTop: 28,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#010000",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#333",
    padding: 8,
    marginBottom: 16,
  },
  cardSelected: {
    borderColor: "#FFD748",
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  iconBoxImage: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 3,
    fontFamily: "Clash Display",
    fontWeight: "800",
    lineHeight: 14,
    textTransform: "capitalize",
  },
  description: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#FFD748",
    borderRadius: 3,
    backgroundColor: "rgba(15, 15, 15, 0.08)",
    opacity: 0.85,
    height: 55,
    justifyContent: "center",
    paddingLeft: 15
  },
  picker: {
    color: "#fff",
    width: "100%",
    height: 55,
  },
  loginText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Clash Display",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.24,
    marginTop: 24,
  },
  loginLink: {
    color: "#FFD748",
  },
  error: {
    color: "#ff5c5c",
    fontSize: 12,
    marginVertical: 5,
  },
});

export default SignupVendor;