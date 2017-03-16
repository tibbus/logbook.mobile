import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export const Info = (props) => {
  const imageUrl = props.user.profileImg? props.user.profileImg : 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png';

  return (
  <View style={styles.container}>
    {/* Styles the stats and settigns icon in a row */}
    <View style={styles.subContainer}>
      {/* Styles the car count stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>{props.user.carCount}</Text>
        <Text style={styles.captionText}>{`Cars`}</Text>
      </View>

      {/* Styles the follow count stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>{props.user.followCount}</Text>
        <Text style={styles.captionText}>{`Follows`}</Text>
      </View>

      {/* Styles the following count stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>{'178'}</Text>
        <Text style={styles.captionText}>{`Followers`}</Text>
      </View>

      {/* Styles the settings icon */}
      <View style={styles.settingsContainer}>
        <Text style={styles.stats}>{'icon'}</Text>
        <Text style={styles.captionText}>{`Settings`}</Text>
      </View>
    </View>
    <View style={styles.subContainer}>
      <Image source={{ uri: imageUrl}} style={styles.photo} />
      <Text style={styles.textTitle}> {props.user.name}</Text>
    </View>

  </View>
)};

const styles = StyleSheet.create({
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
  stats: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10
  },
  captionText: {
    fontSize: 16,
    fontWeight: '200'
  },
  textTitle: {
    marginLeft: 20,
    marginTop: 5,
    fontSize: 35,
    fontWeight: '700',
    //numberOfLines: 2
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
