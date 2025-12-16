import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const colors = {
    purple: '#733C86',
    pink: '#B03982',
    transparentpink: '#b0398236',
    darkpink: '#af3981',
    lightpink: '#b78ea7',
    black: '#231F20',
    white: '#ffffff',
    lightgray: '#f9f9f9',
    midgray: '#f3f4f5',
    bordergray: '#cbcbcc',
    gray: 'gray',
    blacktransparent: '#0000008f'
};

export const routes = {
    baseUrl: `https://services83.demowebsitelinks.com/esar-backend/public/api/`,
    register: `register`,
    login: `login`,
    forgotPassword: `forgot-password`,
    verifyEmail: `verify-email`,
    resetPassword: `reset-password`,

    // getDocument: (documentName: String) => {
    //     return `documents/getDocumentName?search=${documentName}`;
    // },
};

export const API = {

};