import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import styles from './styles';
export const FacebookButton = (onPress) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={[styles.loginButton, styles.facebookButtonBgd]}>
      <View style={styles.loginLogoView} >
        <Image style={styles.loginLogo} source={require('../../Assets/Images/FacebookLogo.png')}/>
      </View>
      <View>
        <Text style={[styles.buttonText, styles.facebookButtonText]}>Continue with Facebook</Text>
      </View>
    </View>
  </TouchableHighlight>
)

export const GoogleButton = (onPress) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={[styles.loginButton, styles.googleButtonBgd]}>
      <View style={styles.loginLogoView}>
        <Image style={styles.loginLogo} source={require('../../Assets/Images/GoogleLogo.png')}/>
      </View>
      <View>
        <Text style={[styles.buttonText, styles.googleButtonText]}>Continue with Google</Text>
      </View>
    </View>
  </TouchableHighlight>
)
