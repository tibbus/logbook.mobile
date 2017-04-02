import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import styles from './styles';
import { capitalize } from 'underscore.string'
import Icon from 'react-native-vector-icons/FontAwesome'


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
        <Text lineBreakMode="tail" numberOfLines={1} style={[styles.container, styles.captionText]}>{capitalize(carMake, true) + ' ' + capitalize(carModel, true)}</Text>
        <Text style={[styles.container, styles.captionText]}>{"12 Followers"}</Text>
      </View>
      <Text style={[styles.captionButton, styles.captionButtonText]}>Edit Profile</Text>
    </View>
  </TouchableHighlight>
)

export const NextButton = (onPress, title) => (
  <TouchableHighlight onPress={() => onPress()}>
    <View style={styles.nextButtonBorder}>
      <View style={[styles.nextButton]}>
        <View style={styles.rowContainer}>
          <View style={[styles.columnContainer]}>
            <Text style={[styles.nextButtonText, styles.buttonText]}>{title}</Text>
          </View>
          <Icon style={styles.nextIcon} name='chevron-right'></Icon>
        </View>
      </View>
    </View>
  </TouchableHighlight>
)
