import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import palette from '../../Styles/Themes/palette';
import { StatsText } from '../Text';

export const Info = (props) => {
  const imageUrl = props.user.profileImg ? props.user.profileImg : 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png';

  return (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <StatsText statsCount={props.user.carCount} statsCaption="Cars"/>
      <StatsText statsCount={props.user.followCount} statsCaption="Follows"/>
      <StatsText statsCount={props.user.followCount} statsCaption="Followers"/>

      <View style={styles.settingsContainer}>
        <Icon name='cog' style={styles.icon} />
        <Text style={styles.captionText}>{`Settings`}</Text>
      </View>
    </View>

    <View style={styles.nameContainer}>
      <Image style={styles.profilePicture} source={{ uri: props.user.profileImg }} />
      <Text style={styles.headline}>{props.user.name}</Text>
    </View>
  </View>
)};

const styles = StyleSheet.create({
  // === Container Styles ===
  container: {
    flex: 1,
    paddingRight: 30,
    //allowFontScaling: true
  },
  profilePicture: {
    borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'white',
  },
  headline: {
    fontSize: 30,
    fontWeight: "700",
    marginLeft: 30,
    flex: 8
  },
  subContainer: {
    flex: 1,
    flexDirection:'row',
    paddingTop: 15,
    alignItems: 'flex-start',
  },
  nameContainer: {
    paddingHorizontal: 30,
    flex: 1.2,
    flexDirection:'row'
  },
  statsContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'flex-start',
  },
  settingsContainer: {
    flex: 1.4,
    flexDirection:'column',
    alignItems: 'flex-end',
  },
  // === Text Styles ===
  statsText: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 5
  },
  captionText: {
    fontSize: 16,
    fontWeight: '200'
  },
  icon: {
    fontSize: 25,
    fontWeight: '700',
    paddingBottom: 3,
    //marginRight:
    color: palette.secondary,
  },
});
