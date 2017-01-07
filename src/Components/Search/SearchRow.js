
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
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

export const SearchRow = (props) => {
  const imageUrl = props.image ? props.image : 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png'
  
  return (
  <View style={styles.container}>
    <Image source={{ uri: imageUrl}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.make} ${props.model} ${props.yearOfManufacture}`}
    </Text>
  </View>
)};