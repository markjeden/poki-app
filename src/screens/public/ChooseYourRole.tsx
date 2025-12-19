/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ImageSourcePropType
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Bg from "./../../assets/images/bg-light.png";
import WelcomeImage from "./../../assets/images/logo.png";
import Collector from "./../../assets/images/collector.png"
import Creator from "./../../assets/images/creator.png"
import Vendor from "./../../assets/images/vendor.png"
import { screenHeight, screenWidth } from '../../utils/Constants';

type RoleId = 'collector' | 'vendor' | 'creator';

interface RoleOption {
  id: RoleId;
  title: string;
  description: string;
  icon: ImageSourcePropType;
}

const OPTIONS: RoleOption[] = [
  {
    id: 'collector',
    title: 'Collector',
    description: 'Track restocks, create wishlists, and discover vendors.',
    icon: Collector,
  },
  {
    id: 'vendor',
    title: 'Vendor',
    description: 'Manage inventory, go live with restocks, and grow your business.',
    icon: Vendor,
  },
  {
    id: 'creator',
    title: 'Creator/Artist',
    description: 'Share content, partner with vendors, and build your community.',
    icon: Creator,
  },
];

function ChooseYourRole(): React.JSX.Element {
    const navigation = useNavigation();

    const [selected, setSelected] = useState<RoleId>('collector');

    const handleSelect = (id: RoleId) => {
        setSelected(id);
    };

    const signup = () => {
        if(selected === 'collector') navigation.navigate('signup-collector')
        if(selected === 'vendor') navigation.navigate('signup-vendor')
        if(selected === 'creator') navigation.navigate('signup-creator')
    }

    return <>
        <ImageBackground
            source={Bg}
            style={styles.wrapper}
        >
            <View style={styles.titleView}>
                <Image source={WelcomeImage} style={styles.titleimage} />
                <Text style={styles.titletext}>PokiStock</Text>
            </View>

            <View style={styles.roleTitleView}>
                <Text style={styles.roleTitle}>Choose Your Role</Text>
                <Text style={styles.roleSubTitle}>Select how you want to use PokéStock</Text>
            </View>

            <View style={styles.cardcontainer}>
                {OPTIONS.map(option => {
                    const isSelected = selected === option.id;

                    return (
                        <TouchableOpacity
                            key={option.id}
                            activeOpacity={0.85}
                            onPress={() => handleSelect(option.id)}
                            style={[
                                styles.card,
                                isSelected && styles.cardSelected,
                            ]}
                        >
                            <View style={styles.iconBox}>
                                <Image source={option.icon} style={styles.iconBoxImage} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{option.title}</Text>
                                <Text style={styles.description}>
                                    {option.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={() => signup()}>
                    <Text style={styles.text}>Continue</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </>;
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#000000ff',
        flex: 1,
        // padding: 40
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.03,
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleimage: {
        width: 63.824,
        height: 55.49,
        resizeMode: 'contain'
    },
    titletext: {
        color: '#FFF',
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
        color: '#FFF',
        fontFamily: 'Clash Display',
        fontSize: 22,
        fontStyle: 'normal',
        // fontWeight: 600,
        fontWeight: 800,
        lineHeight: 20,
        textTransform: 'uppercase',
    },
    roleSubTitle: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 11.923,
        marginTop: 9
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
        padding: 16,
        marginBottom: 16,
    },

    cardSelected: {
        borderColor: '#FFD748',
    },

    iconBox: {
        width: 70,
        height: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    iconBoxImage: {
        width: 35,
        height: 35,
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
        marginBottom: 5,
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
    }
});

export default ChooseYourRole;