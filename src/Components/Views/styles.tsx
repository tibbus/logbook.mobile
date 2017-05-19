import React from 'react';
import {
    Dimensions,
    StyleSheet,
} from 'react-native';
import palette from '../../Styles/Themes/palette';

const { width, height } = Dimensions.get("window");
const tabBarHeight = 60;

export default StyleSheet.create({
    /* ====== General styles ====== */
    gradient: {
        flex: 1,
    },
    gradientView: {
        flexDirection: 'column', 
        width: width, 
        height: height-tabBarHeight,
    },
});