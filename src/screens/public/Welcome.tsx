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
import Bg from "./../../assets/images/bg.png";
import WelcomeImage from "./../../assets/images/logo.png";
import SlidearrowImage from "./../../assets/images/slide-arrow.png";

function Welcome(): React.JSX.Element {
    const navigation = useNavigation();

    return <>
        {/* <ScrollView style={styles.wrapper} keyboardShouldPersistTaps="handled"></ScrollView> */}

        <ImageBackground
            source={Bg}
            style={styles.wrapper}
        >
            <View style={styles.imageView}>
                <Image source={Bg3} style={styles.bg} />
                <Image source={WelcomeImage} style={styles.image} />
            </View>

            <View style={styles.titleView}>
                <Text style={styles.mainTitle}>Welcome To PokiStock</Text>
                <Text style={styles.subTitle}>The UK's Premier Pokémon TCG Community</Text>
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('get-started')}>
                    <Image source={SlidearrowImage} style={styles.slidearrowImage} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </>;
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F44F10',
        flex: 1
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
    mainTitle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 44,
        textTransform: 'uppercase',
        fontWeight: 800,
        fontFamily: 'ClashDisplay-Semibold'
    },
    subTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 12
    },
    buttonView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        padding: 45
    },
    button: {
        borderRadius: 30,
        elevation: 5
    },
    slidearrowImage: {
        width: 66,
        height: 66,
        objectFit: 'contain',
        marginLeft: 'auto',

    }
});

export default Welcome;
