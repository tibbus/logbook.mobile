import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import palette from '../../Themes/palette';
import { StatsText, HeadingOne } from '../Text'

export const Info = (props) => {
  const imageUrl = props.user.profileImg? props.user.profileImg : 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png';

  return (
  <View style={styles.container}>
    {/* Styles the stats and settigns icon in a row */}
    <View style={styles.subContainer}>
      {/* Styles the car count stats */}
      {StatsText(() => props.user.carCount, 'Cars')}

      {/* Styles the follow count stats */}
      {StatsText(() => props.user.followCount, 'Follows')}

      {/* Styles the following count stats */}
      {StatsText(() => props.user.followCount, 'Followers')}

      {/* Styles the settings icon */}
      <View style={styles.settingsContainer}>
        <Icon name='cog' style={styles.icon} />
        <Text style={styles.captionText}>{`Settings`}</Text>
      </View>
    </View>
    <View style={styles.subContainer}>
      <Image source={{ uri: imageUrl}} style={styles.photo} />
      {HeadingOne(() => props.user.name)}
    </View>

  </View>
)};

const photoWidth = 60;
const styles = StyleSheet.create({
  // === Container Styles ===
  container: {
    flex: 1,
    paddingHorizontal: 30,
    //allowFontScaling: true
  },
  subContainer: {
    flex: 1,
    flexDirection:'row',
    paddingTop: 25,
  },
  statsContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'flex-start',
  },
  settingsContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'flex-end', //or center
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
  // === Image Styles ===
  photo: {
    height: photoWidth,
    width: photoWidth,
    borderRadius: photoWidth/2,
  },
});
