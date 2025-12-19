/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Switch,
  Pressable,
  Dimensions
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';

import Bg from "./../../assets/images/bg-light.png";
import WelcomeImage from "./../../assets/images/logo.png";

import Eyeslash from "./../../assets/images/eye-slash.png"
import Collector from "./../../assets/images/collector.png"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type SignupCollectorFormData = {
  name: string;
  email: string;
  password: string;
};

function Checkbox({ checked, onPress }: { checked: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.checkbox, checked && styles.checkboxChecked]} onPress={onPress}>
      {checked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
  );
}

function SignupCollector(): React.JSX.Element {
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm<SignupCollectorFormData>();
    const [secure, setSecure] = useState(true);
    const [sealed, setSealed] = useState(false);
    const [singleCards, setSingleCards] = useState(false);
    const [gradingServices, setGradingServices] = useState(false);
    const [vintageCards, setVintageCards] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const onSubmit = (data: SignupCollectorFormData) => {
      console.log("Login Data:", data);
    };

    return <>
        <ImageBackground
            source={Bg}
            style={styles.wrapper}
        >
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
                    <Text style={styles.roleTitle}>Sign Up as Collector</Text>
                    <Text style={styles.roleSubTitle}>Share content, partner with vendors, {'\n'}and build your community.</Text>
                </View>

                <View style={styles.cardcontainer}>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={[
                            styles.card,
                            styles.cardSelected,
                        ]}
                    >
                        <View style={styles.iconBox}>
                            <Image source={Collector} style={styles.iconBoxImage} />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Collector</Text>
                            <Text style={styles.description}>
                                account type
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

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
                    {errors.name && (
                        <Text style={styles.error}>Name is required</Text>
                    )}
                </View>

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
                </View>
                {errors.email && (
                <Text style={styles.error}>Email is required</Text>
                )}

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
                
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setSecure(!secure)}
                >
                    {
                    secure ?
                        <Image source={Eyeslash} style={styles.eyeImage} />
                        :
                        <Image source={Eyeslash} style={styles.eyeImage} />
                    }
                </TouchableOpacity>
                </View>
                </View>
                {errors.password && (
                <Text style={styles.error}>Password is required</Text>
                )}

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
    </>;
}

const CHECKBOX_SIZE = screenWidth * 0.04;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#000000ff',
        flex: 1,
        // padding: 40
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.03,
    },
    scrollContainer: {
        // paddingHorizontal: screenWidth * 0.06,
        // paddingVertical: screenHeight * 0.04,
        // paddingBottom: screenHeight * 0.1,
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleimage: {
        width: 63.824,
        height: 55.49,
        resizeMode: 'contain'
    },
    titletext: {
        color: '#fff',
        fontFamily: 'Clash Display',
        fontSize: 31.963,
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 33.218,
        textTransform: 'uppercase',
        position: 'relative',
        top: 5,
        left: 5
    },
    roleTitleView: {
        marginTop: 34
    },
    roleTitle: {
        color: '#fff',
        fontFamily: 'Clash Display',
        fontSize: 22,
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 20,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    roleSubTitle: {
        color: '#fff',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 11.923,
        marginTop: 9,
        textAlign: 'center'
    },
    buttonView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // flex: 1,
        marginTop: 15
    },
    button: {
        padding: 18.751,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 53.106,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#FFD748',
        backgroundColor: '#010000',
        boxShadow: '0 107.034px 29.688px 0 rgba(0, 0, 0, 0.00), 0 68.752px 27.345px 0 rgba(0, 0, 0, 0.02), 0 38.282px 23.438px 0 rgba(0, 0, 0, 0.07), 0 17.188px 17.188px 0 rgba(0, 0, 0, 0.12), 0 3.906px 9.375px 0 rgba(0, 0, 0, 0.13), 0 0 0 0 rgba(0, 0, 0, 0.14)',
        width: '100%'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Clash Display',
        fontSize: 16,
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 16,
        textTransform: 'uppercase'
    },
    inputText: {
      color: '#FFFFFF',
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: '400',
      textTransform: 'capitalize',
      marginBottom: 10
    },
    inputWrapper: {
      marginTop: 24
    },
    input: {
      borderRadius: 3,
      borderWidth: 1,
      borderColor: "#FFD748",
      backgroundColor: 'rgba(15, 15, 15, 0.08)',
      height: 55,
      paddingHorizontal: 20,
      color: '#FFFFFF',
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 14,
      opacity: 0.85,
    },
    passwordWrapper: {
      marginTop: 27
    },
    passwordBox: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#FFD748",
      borderWidth: 1,
      borderRadius: 3,
      backgroundColor: 'rgba(15, 15, 15, 0.08)',
      opacity: 0.85,
    },
    passwordInput: {
      flex: 1,
      color: "#fff",
      height: 55,
      paddingHorizontal: 20,
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 14,
    },
    eyeButton: {
      paddingHorizontal: 14,
    },
    eyeImage: {
      width: 20,
      resizeMode: 'contain'
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
    rememberRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    
    rememberText: {
      color: '#FFFFFF',
      textAlign: 'right',
      fontFamily: 'Clash Display',
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: -0.12,
      marginLeft: 7
    },
    forgotText: {
      color: '#FFFFFF',
      fontFamily: 'Clash Display',
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0.24,
      borderBottomColor: '#fff',
      borderBottomWidth: 1
    },
    orText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Clash Display',
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.28,
      textTransform: 'capitalize',
      marginTop: 36,
      marginBottom: 14,
    },
    socialRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
    socialButton: {
      width: 40,
      height: 40,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: "#fff",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    socialImage: {
      
    },
    loginText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Clash Display',
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0.24,
      marginTop: 24,
    },
    loginLink: {
      color: "#FFD748",
      // fontWeight: "600",
    },
    error: {
      color: "#ff5c5c",
      fontSize: 12,
      marginVertical: 5,
    },
    cardcontainer: {
        marginTop: 28
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#010000',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#333',
        padding: 8,
        marginBottom: 16,
    },

    cardSelected: {
        borderColor: '#FFD748',
    },

    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    iconBoxImage: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },

    icon: {
        fontSize: 22,
    },

    textContainer: {
        flex: 1,
    },

    title: {
        color: '#fff',
        fontSize: 17,
        marginBottom: 3,
        fontFamily: "Clash Display",
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 14,
        textTransform: 'capitalize',
    },

    description: {
        color: '#aaa',
        fontSize: 13,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: 16,
    },

    container: {
        // paddingHorizontal: screenWidth * 0.04,
        paddingVertical: 20,
    },
    heading: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 12,
        fontWeight: '600',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: CHECKBOX_SIZE,
        height: CHECKBOX_SIZE,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    checkboxInner: {
        width: CHECKBOX_SIZE * 0.5,
        height: CHECKBOX_SIZE * 0.5,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
});

export default SignupCollector;