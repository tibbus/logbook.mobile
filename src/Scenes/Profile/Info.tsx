import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import palette from '../../Styles/Themes/palette';
import { StatsText } from '../../Components/Text';
import textStyle from '../../Styles/text';

export const Info = (props) => {
  const imageUrl = props.user.profileImg ? props.user.profileImg : 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png';

  return (
  <View style={styles.container}>
    <View style={styles.infoContainer}>
      <StatsText count={props.user.carCount} caption="Cars" />
      <StatsText count={props.user.followCount} caption="Follows" />
      <StatsText count={props.user.followCount} caption="Followers" />

      <View style={styles.settingsContainer}>
        <Icon name='cog' style={styles.icon} />
        <Text style={textStyle.statsCaptionText}>{`Settings`}</Text>
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
    flex: 1
  },
  profilePicture: {
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: 'white',
  },
  headline: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 15,
    flex: 8
  },
  infoContainer: {
    flexDirection:'row',
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: 'flex-start',
  },
  nameContainer: {
    marginTop: 20,
    paddingHorizontal: 25,
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
