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
    return (
      <TouchableHighlight onPress={onSettingsPress}>
        <Text>Settings</Text>
      </TouchableHighlight>
    )
  }
  else if (followed) {
    return (
      <TouchableHighlight onPress={onUnFollowPress}>
        <Text>UnFollow</Text>
      </TouchableHighlight>
    )
  }
  else {
    return (
      <TouchableHighlight onPress={onFollowPress}>
        <Text>Follow</Text>
      </TouchableHighlight>
    )
  }
}

const VerifyButton = (verified, owned, onVerify) => {
  if (verified === false && owned === true) {
    return (
      ActionButton(onVerify, 'Verify')
    )
  }
}


export const Info = ({ owned, car, onSettingsPress, followed, onFollowPress, onUnFollowPress, verified, onVerifyPress }) => (
  <View style={styles.container}>
    <View style={styles.statContainer}>
      <StatsText count={car.carStats.postsCount.count} caption="Posts" />
      <StatsText count={car.carStats.mediaCount.count} caption="Media" />
      <StatsText count={car.carStats.followersCount.count} caption="Followers" />
    </View>
    {/*{ActionButtons(owned, onSettingsPress, followed, onFollowPress, onUnFollowPress)}*/}
    <View style={styles.subContainer}>
      <Image source={{ uri: car.ownerInfo.image }} style={styles.photo} />
      <Text style={styles.ownerName}>{car.ownerInfo.name}</Text>
    </View>
    <View style={styles.subContainer}>
      {VerifyButton(verified, owned, onVerifyPress)}
    </View>
  </View>
)
