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
import Creator from "./../../assets/images/creator.png";
import { screenHeight } from "../../utils/Constants";

const { width: screenWidth } = Dimensions.get("window");

type SignupCreatorFormData = {
  name: string;
  email: string;
  password: string;
  channel: string;
  currentPlatform: string;
};

function Checkbox({ checked, onPress }: { checked: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.checkbox, checked && styles.checkboxChecked]} onPress={onPress}>
      {checked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
  );
}

function SignupCreator(): React.JSX.Element {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm<SignupCreatorFormData>();
  const [secure, setSecure] = useState(true);
  const [pack, setPack] = useState(false);
  const [streams, setStreams] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [giveaways, setGiveaways] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const onSubmit = (data: SignupCreatorFormData) => {
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
          <Text style={styles.roleTitle}>Sign Up as Creator</Text>
          <Text style={styles.roleSubTitle}>
            Share content, partner with vendors, {'\n'}and build your community.
          </Text>
        </View>

        <View style={styles.cardcontainer}>
          <TouchableOpacity activeOpacity={0.85} style={[styles.card, styles.cardSelected]}>
            <View style={styles.iconBox}>
              <Image source={Creator} style={styles.iconBoxImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Creator</Text>
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

        {/* Content Platform */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Content Platform*</Text>
          <Controller
            control={control}
            name="currentPlatform"
            rules={{ required: "Content Platform is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerWrapper}>
                <Picker
                  style={styles.picker}
                  dropdownIconColor="#FFD748"
                  selectedValue={value}
                  onValueChange={onChange}
                  mode="dropdown"
                >
                  <Picker.Item label="Select primary platform" value="" color="#ccc" />
                  <Picker.Item label="Test" value="test" />
                </Picker>
              </View>
            )}
          />
          {errors.currentPlatform && <Text style={styles.error}>{errors.currentPlatform.message}</Text>}
        </View>

        {/* Channel/Username */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputText}>Channel/Username*</Text>
          <Controller
            control={control}
            name="channel"
            rules={{
              required: "Channel/Username is required"
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="@yourusername"
                placeholderTextColor="#fff"
                keyboardType="url"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.channel && <Text style={styles.error}>{errors.channel.message}</Text>}
        </View>

        {/* Specialties */}
        <View style={styles.container}>
          <Text style={styles.heading}>Specialties*</Text>

          <View style={styles.optionRow}>
            <Checkbox checked={pack} onPress={() => setPack(!pack)} />
            <Text style={styles.optionText}>Pack Openings</Text>
          </View>

          <View style={styles.optionRow}>
            <Checkbox checked={streams} onPress={() => setStreams(!streams)} />
            <Text style={styles.optionText}>Live Streams</Text>
          </View>

          <View style={styles.optionRow}>
            <Checkbox checked={reviews} onPress={() => setReviews(!reviews)} />
            <Text style={styles.optionText}>Reviews & Analysis</Text>
          </View>

          <View style={styles.optionRow}>
            <Checkbox checked={giveaways} onPress={() => setGiveaways(!giveaways)} />
            <Text style={styles.optionText}>Giveaways</Text>
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

export default SignupCreator;