import React from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Bg3 from "./../../assets/images/bg3.png";
import Bg from "./../../assets/images/bg.png";
import WelcomeImage from "./../../assets/images/logo.png";
import SlidearrowImage from "./../../assets/images/slide-arrow.png";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function Welcome(): React.JSX.Element {
    const navigation = useNavigation();

    return (
        <ImageBackground source={Bg} style={styles.wrapper}>
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
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F44F10',
    },
    imageView: {
        position: 'relative',
        alignItems: 'center',
        marginTop: screenHeight * 0.05,
    },
    bg: {
        position: 'absolute',
        height: screenHeight,
        width: screenWidth,
        display: 'none'
    },
    image: {
        width: screenWidth * 0.6,
        height: screenHeight * 0.25,
        resizeMode: 'contain',
    },
    titleView: {
        paddingHorizontal: screenWidth * 0.05,
        marginTop: screenHeight * 0.05,
    },
    mainTitle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: screenWidth * 0.09, // responsive font
        textTransform: 'uppercase',
        fontWeight: '800',
        fontFamily: 'ClashDisplay-Semibold',
    },
    subTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: screenWidth * 0.035, // responsive font
        marginTop: 10,
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: screenWidth * 0.05,
    },
    button: {
        borderRadius: 30,
        elevation: 5,
    },
    slidearrowImage: {
        width: screenWidth * 0.15,
        height: screenWidth * 0.15,
        resizeMode: 'contain',
    },
});

export default Welcome;
