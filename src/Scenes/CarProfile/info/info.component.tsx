import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles } from './info.styles';
import { StatsText } from '../../../Components/Text';
import textStyle from '../../../Styles/text';
import { ActionButton } from '../../../Components/Button';

const ActionButtons = (owned, onSettingsPress, followed, onFollowPress, onUnFollowPress) => {
  if (owned) {
    return null;
    /*return (
      <TouchableHighlight onPress={onSettingsPress}>
        <Text>Settings</Text>
      </TouchableHighlight>
    )*/
  }
  else if (followed) {
    return (
      <TouchableHighlight onPress={onUnFollowPress} style={[styles.buttonContainer, styles.unfollowContainer]}>
        <Text style={[styles.buttonText, styles.unfollowText]}>Following</Text>
      </TouchableHighlight>
    )
  }
  else {
    return (
      <TouchableHighlight onPress={onFollowPress} style={[styles.buttonContainer, styles.followContainer]}>
        <Text style={[styles.buttonText, styles.followText]}>Follow</Text>
      </TouchableHighlight>
    )
  }
}

const VerifyButton = (verified, owned, onVerify) => {
  if (verified === false && owned === true) {
    return (
      <TouchableHighlight onPress={onVerify} style={[styles.buttonContainer, styles.verifyContainer]}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableHighlight>
    );
  }

  return null;
}


export const Info = ({ owned, car, onSettingsPress, followed, onFollowPress, onUnFollowPress, verified, onVerifyPress }) => (
  <View style={styles.container}>
    <View style={styles.statContainer}>
      <StatsText count={car.carStats.postsCount.count} caption="Posts" />
      <StatsText count={car.carStats.mediaCount.count} caption="Media" />
      <StatsText count={car.carStats.followersCount.count} caption="Followers" />
    </View>
    <View style={styles.subContainer}>
      <Image source={{ uri: car.ownerInfo.image }} style={styles.photo} />
      <Text style={styles.ownerName}>{car.ownerInfo.name}</Text>
    </View>
      {VerifyButton(verified, owned, onVerifyPress)}
      {ActionButtons(owned, onSettingsPress, followed, onFollowPress, onUnFollowPress)}
  </View>
)
