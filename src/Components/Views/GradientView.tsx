import React, { Component } from 'react';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient/index.ios.js';
import palette from '../../Styles/Themes/palette';
import styles from './styles';

const { height } = Dimensions.get("window");
interface propTypes {
  fullScreen?: boolean
}

export class GradientView extends React.Component<any, any> {

    constructor(props) {
        super(props)
    }

    render() {
        const tabBarHeight = 60;
        const styleHeight = this.props.fullScreen ? {flex:1} : { height: height-tabBarHeight}
        return (
            <View style={[styles.gradientView, styleHeight]}>
                <LinearGradient
                    colors={[palette.primary, palette.secondary]}
                    style={styles.gradient}>
                    {this.props.children}
                </LinearGradient>
            </View>
        );
    }
}