import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Back from "./../../assets/images/back.png";

export default function DigitalDocumentsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.pageTitleContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>

        {/* PAGE TITLE */}
        <Text style={styles.pageTitle}>FORGOT PASSWORD</Text>
      </View>

      <View style={styles.innercontainer}>
        {/* Title */}
        <Text style={styles.title}>
          EMAIL ADDRESS HERE
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Enter The Email Address Associated With Your Account
        </Text>

        {/* Registration */}
        <Text style={styles.label}>EMAIL ADDRESS*</Text>
        <TextInput
          placeholder="example@example.com"
          placeholderTextColor="#fff"
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('home')}>
          <Text style={styles.btnText}>RECOVER PASSWORD</Text>
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
  btn: {
    backgroundColor: "#2ea8ff",
    paddingVertical: 15,
    width: "75%",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 10
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  }
});
