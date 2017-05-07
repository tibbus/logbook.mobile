import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient/index.ios.js';
import palette from '../../Styles/Themes/palette';
import styles from './styles';

export class GradientView extends React.Component<any, any> {
    render() {
        return (
            <View style={styles.gradientView}>
                <LinearGradient
                    colors={[palette.primary, palette.secondary]}
                    style={styles.gradient}>
                    {this.props.children}
                </LinearGradient>
            </View>
        );
    }
}