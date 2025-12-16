import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Back from "./../../assets/images/back.png";

export default function ResetYourPasswordScreen({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmedPasswordVisible, setConfirmedPasswordVisible] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.pageTitleContainer}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Image source={Back} style={styles.back} />
            </TouchableOpacity>
    
            {/* PAGE TITLE */}
            <Text style={styles.pageTitle}>RESET PASSWORD</Text>
          </View>

        <View style={styles.innercontainer}>
            {/* Title */}
            <Text style={styles.title}>
                ENTER NEW PASSWORD
            </Text>

            {/* Description */}
            <Text style={styles.description}>
                Your New Password Must Be Different From Previously Used Password.
            </Text>

            {/* Password */}
            <Text style={styles.label}>PASSWORD*</Text>
            <View style={styles.passwordBox}>
                <TextInput
                placeholder="***********"
                placeholderTextColor="#fff"
                secureTextEntry={!passwordVisible}
                style={styles.inputPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                {
                    passwordVisible ?
                    <Image style={[styles.eyeIcon]} source={require('./../../assets/images/close-eye.png')} /> :
                    <Image style={[styles.eyeIcon]} source={require('./../../assets/images/open-eye.png')} />
                }
                </TouchableOpacity>
            </View>

            {/* Password */}
            <Text style={styles.label}>CONFIRMED PASSWORD*</Text>
            <View style={styles.passwordBox}>
                <TextInput
                placeholder="***********"
                placeholderTextColor="#fff"
                secureTextEntry={!confirmedPasswordVisible}
                style={styles.inputPassword}
                />
                <TouchableOpacity onPress={() => setConfirmedPasswordVisible(!confirmedPasswordVisible)}>
                {
                    confirmedPasswordVisible ?
                    <Image style={[styles.eyeIcon]} source={require('./../../assets/images/close-eye.png')} /> :
                    <Image style={[styles.eyeIcon]} source={require('./../../assets/images/open-eye.png')} />
                }
                </TouchableOpacity>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('home')}>
            <Text style={styles.btnText}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
        </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14135F",
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
  },
  pageTitleContainer: {
    position: 'relative',
    marginBottom: 15
  },
  pageTitle: {
    color: "#1689FE",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
    textAlign: 'center'
  },
  innercontainer: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    width: 25,
    height: 25,
    position: 'absolute',
    zIndex: 999
  },
  back: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  flag: {
    width: 45,
    height: 45,
    position: "absolute",
    right: 60,
    top: 20,
    borderRadius: 50,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    lineHeight: 18,
    marginBottom: 5,
    fontWeight: 600
  },
  description: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    lineHeight: 18,
    marginBottom: 18,
  },
  mainButton: {
    backgroundColor: "#1b71d2",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 25,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 10,
  },
  cardList: {
    gap: 12,
  },
  card: {
    backgroundColor: "#1689FE1F",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    gap: 12,
  },
  cardActive: {
    backgroundColor: "#2ea8ff",
  },
  cardText: {
    flex: 1,
    color: "#fff",
    fontWeight: "600",
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
    marginBottom: 30,
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
  eyeIcon: {
    paddingHorizontal: 8,
    width: 20,
    resizeMode: 'contain'
  },
  btn: {
    backgroundColor: "#2ea8ff",
    paddingVertical: 15,
    width: "75%",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 30
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  }
});
