import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import styles from './styles';
import {capitalize} from 'underscore.string'

export const FacebookButton = (onPress) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={[styles.loginButton, styles.facebookButtonBgd]}>
      <View style={styles.loginLogoView} >
        <Image style={styles.loginLogo} source={require('../../Assets/Images/FacebookLogo.png')} />
      </View>
      <View>
        <Text style={[styles.loginButtonText, styles.facebookButtonText]}>Continue with Facebook</Text>
      </View>
    </View>
  </TouchableHighlight>
)

export const GoogleButton = (onPress) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={[styles.loginButton, styles.googleButtonBgd]}>
      <View style={styles.loginLogoView}>
        <Image style={styles.loginLogo} source={require('../../Assets/Images/GoogleLogo.png')} />
      </View>
      <View>
        <Text style={[styles.loginButtonText, styles.googleButtonText]}>Continue with Google</Text>
      </View>
    </View>
  </TouchableHighlight>
)

export const CaptionButton = (onPress, carMake, carModel) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={styles.rowContainer}>
      <View style={[styles.columnContainer]}>
        {/* Fix car name capitlisation */}
        <Text lineBreakMode="tail" numberOfLines={1} style={[styles.container, styles.captionText]}>{capitalize([carMake, " ", carModel], true)}</Text>
        <Text style={[styles.container, styles.captionText]}>{"12 Followers"}</Text>
      </View>
      <Text style={[styles.captionButton, styles.captionButtonText]}>Edit Profile</Text>
    </View>   
  </TouchableHighlight>
)

export const NextButton = (onPress, title) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={[styles.loginButton, styles.googleButtonBgd]}>
      <View>
        <Text style={[styles.loginButtonText, styles.googleButtonText]}>{title}</Text>
      </View>
    </View>
  </TouchableHighlight>
)
