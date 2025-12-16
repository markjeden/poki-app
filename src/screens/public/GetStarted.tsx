/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    ImageBackground
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyContainer from '../../components/BuddyContainer';
import { colors, screenHeight, screenWidth } from '../../utils/Constants';
import BuddyCard from '../../components/BuddyCard';
import BuddyButton from '../../components/BuddyButton';
import BuddyLang from '../../components/BuddyLang';
import { useNavigation } from '@react-navigation/native';
import Bg3 from "./../../assets/images/bg3.png";
import Bg from "./../../assets/images/bg-light.png";
import WelcomeImage from "./../../assets/images/logo.png";
import SlidearrowImage from "./../../assets/images/slide-arrow.png";

function GetStarted(): React.JSX.Element {
    const navigation = useNavigation();

    return <>
        <ImageBackground
            source={Bg}
            style={styles.wrapper}
        >
            <View style={styles.imageView}>
                <Image source={Bg3} style={styles.bg} />
                <Image source={WelcomeImage} style={styles.image} />
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('choose-your-role')}>
                    <Text style={styles.text}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.lbutton}>
                    <Text style={styles.ltext}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </>;
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#000000ff',
        flex: 1,
        padding: 45
    },
    imageView: {
        position: 'relative'
    },
    bg: {
        position: 'absolute',
        height: screenHeight - 100,
        width: screenWidth,
        display: 'none'
    },
    image: {
        width: screenWidth * 0.8,
        resizeMode: 'contain',
        marginHorizontal: 'auto'
    },
    titleView: {
        padding: 60
    },
    buttonView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1
    },
    lbutton: {
        padding: 18.751,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 53.106,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#FFD748',
        backgroundColor: '#FFF',
        boxShadow: '0 107.034px 29.688px 0 rgba(0, 0, 0, 0.00), 0 68.752px 27.345px 0 rgba(0, 0, 0, 0.02), 0 38.282px 23.438px 0 rgba(0, 0, 0, 0.07), 0 17.188px 17.188px 0 rgba(0, 0, 0, 0.12), 0 3.906px 9.375px 0 rgba(0, 0, 0, 0.13), 0 0 0 0 rgba(0, 0, 0, 0.14)',
        width: '100%',
        marginTop: 14
    },
    ltext: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Clash Display',
        fontSize: 16,
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 16,
        textTransform: 'uppercase'
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
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Clash Display',
        fontSize: 16,
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 16,
        textTransform: 'uppercase'
    },
    slidearrowImage: {
        width: 66,
        height: 66,
        objectFit: 'contain',
        marginLeft: 'auto',

    }
});

export default GetStarted;
