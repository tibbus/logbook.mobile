import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection:'row',
    padding: 12,
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export const Info = (props) => {
  const imageUrl = props.user.profileImg? props.user.profileImg : 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png';
  
  return (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <Image source={{ uri: imageUrl}} style={styles.photo} />
      <Text style={styles.text}>
          {`Cars ${props.user.carCount} Follows ${props.user.followCount}`}
      </Text>
    </View>
    <Text style={styles.text}>
        {props.user.name}
    </Text>
    
  </View>
)};