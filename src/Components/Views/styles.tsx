import React from 'react';
import {
    Dimensions,
    StyleSheet,
} from 'react-native';
import palette from '../../Themes/palette';

const { width, height } = Dimensions.get("window");
const tabBarHeight = 60;

export default StyleSheet.create({
    /* ====== General styles ====== */
    gradient: {
        flex: 1,
    } as React.ViewStyle,
    gradientView: {
        flexDirection: 'column', 
        width: width, 
        height: height-tabBarHeight,
    } as React.ViewStyle,
});