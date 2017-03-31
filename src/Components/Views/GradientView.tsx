import React, { Component } from 'react';
import {
    Dimensions,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient/index.ios.js';
import palette from '../../Themes/palette';
import styles from './styles';

const { width, height } = Dimensions.get("window");

export class GradientView extends React.Component<any, any> {
    render() {
        return (
            <View style={{ flexDirection: 'column', width: width, height: height, }}>
                <LinearGradient
                    colors={[palette.primary, palette.secondary]}
                    style={styles.gradient} />
            </View>
        );
    }
}