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
  <TouchableHighlight style={styles.captionView} onPress={() => onPress()}>
    <View style={styles.captionButtonView}>
      <View style={styles.captionTextView}>
        <Text lineBreakMode="tail" numberOfLines={1} style={styles.captionText}>{[carMake, " ", carModel]}</Text>
        <Text style={styles.captionText}>{"12 Followers"}</Text>
      </View>    
      <View style={[styles.captionButton]}>
        <Text style={styles.captionButtonText}>Edit Profile</Text>
      </View>
    </View>
  </TouchableHighlight>
)