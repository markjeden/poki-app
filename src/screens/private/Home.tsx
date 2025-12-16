import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LoginLogo from "./../../assets/images/login-logo.png";
import LogoUSA from "./../../assets/images/logo-usa.png";
import LogoEU from "./../../assets/images/logo-EU.png";
import LogoUK from "./../../assets/images/logo-UK.png";
import Back from "./../../assets/images/back.png";
import Facebook from "./../../assets/images/icon-facebook.png";
import Instagram from "./../../assets/images/icon-instagram.png";
import Twitter from "./../../assets/images/icon-twitter.png";
import Youtube from "./../../assets/images/icon-youtube.png";

export default function DigitalDocumentsScreen({ navigation, route }) {
  const { country } = route.params;

  const [pressedButton, setPressedButton] = useState(null);

  const buttons = [
    { id: "instagram", icon: Instagram },
    { id: "facebook", icon: Facebook },
    { id: "twitter", icon: Twitter },
    { id: "youtube", icon: Youtube },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.pageTitleContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>

        {/* Logo */}
        {
          country === 'usa' && <Image source={LogoUSA} style={styles.logo} />
        }

        {
          country === 'eu' && <Image source={LogoEU} style={styles.logo} />
        }

        {
          country === 'uk' && <Image source={LogoUK} style={styles.logo} />
        }
        
      </View>      

      {/* Logo */}
      {/* <View style={styles.logoWrapper}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Image source={require("../assets/flag.png")} style={styles.flag} />
      </View> */}

      <View style={styles.innercontainer}>
        <View>
          {/* Description */}
          <Text style={styles.description}>
            Easily access your digital ID card, certification letter, 
            and certificate.
          </Text>

          {/* Documents Button */}
          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>DIGITAL DOCUMENTS</Text>
          </TouchableOpacity>

          {/* Document Buttons */}
          <View style={styles.cardList}>

            {/* Active Card */}
            {
              country === 'usa' && 
                <TouchableOpacity
                  style={[styles.card, styles.cardActive]}
                  onPress={() => Linking.openURL("https://emotionalsupportanimalsusa.com/replace.html")}
                >
                  <Text style={styles.cardText}>
                    Emotional Support Animals US - Your Guide to ESA Rights and Registration
                  </Text>
                  <Icon name="chevron-right" size={20} color="#fff" />
                </TouchableOpacity>
            }

            {
              country === 'eu' && 
                <TouchableOpacity
                  style={[styles.card, styles.cardActive]}
                  onPress={() => Linking.openURL("https://esaorgeu.com/replace.html")}
                >
                  <Text style={styles.cardText}>
                    Emotional Support Animals EU - Your Guide to ESA Rights and Registration
                  </Text>
                  <Icon name="chevron-right" size={20} color="#fff" />
                </TouchableOpacity>
            }

            {
              country === 'uk' &&
                <TouchableOpacity
                  style={[styles.card, styles.cardActive]}
                  onPress={() => Linking.openURL("https://esaorguk.com/replace.html")}
                >
                  <Text style={styles.cardText}>
                    Emotional Support Animals UK - Your Guide to ESA Rights and Registration
                  </Text>
                  <Icon name="chevron-right" size={20} color="#fff" />
                </TouchableOpacity>
            }

            
          </View>
        </View>
        
        <View style={styles.social}>
          {buttons.map((btn) => (
            <TouchableOpacity
              key={btn.id}
              style={[
                styles.socialButton,
                pressedButton === btn.id && styles.activeButton,
              ]}
              onPressIn={() => setPressedButton(btn.id)}
              onPressOut={() => setPressedButton(null)}
            >
              <Image source={btn.icon} style={styles.socialImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14135F",
    flexGrow: 1,
    padding: 20,
  },
  innercontainer: {
    paddingVertical: 15,
    flex: 1
  },
  pageTitleContainer: {
    position: 'relative',
    // marginBottom: 15
  },
  backBtn: {
    width: 25,
    height: 25,
    position: 'absolute',
    zIndex: 999,
  },
  back: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginHorizontal: 'auto',
    position: "relative",
    bottom: 30,
    marginBottom: -60
  },
  // logo: {
  //   width: 150,
  //   height: 150,
  //   resizeMode: "contain",
  // },
  flag: {
    width: 45,
    height: 45,
    position: "absolute",
    right: 60,
    top: 20,
    borderRadius: 50,
  },
  description: {
    color: "#d3e4ff",
    fontSize: 12,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
    lineHeight: 18,
    marginBottom: 18,
  },
  mainButton: {
    backgroundColor: "#1689FE",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignSelf: "center",
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
    borderRadius: 14,
    gap: 12,
  },
  cardActive: {
    backgroundColor: "#1689FE",
  },
  cardText: {
    flex: 1,
    color: "#fff",
    fontWeight: "600",
  },
  social: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginTop: "auto",
    gap: 10
  },
  socialButton: {
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#302F72"
  },
  socialImage: {
    
  },
  activeButton: {
    backgroundColor: "#1689FE"
  },
});
