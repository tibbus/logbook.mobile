
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import styles
import background from '../../Themes/background';
import text from '../../Themes/text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: background.component,
    borderTopWidth: 2,
    borderTopColor: background.color,
  },
  containerEmpty: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    marginLeft: 20,
    fontSize: 15,
    color: text.secondaryHeading,
  },
  carTitle: {
    marginLeft: 20,
    fontSize: 21,
    fontWeight: "700",
  },
  photo: {
    height: 70,
    width: 100,
    borderRadius: 5,
  },
});

export const SearchRow = (props) => {
  const imageUrl = props.image ? props.image : 'http://www.carlotfinance.com/assets/img/car_profile_placeholder.jpg'

  return (
  <View style={styles.container}>
    <Image source={{ uri: imageUrl}} style={styles.photo} />
    <View style={styles.containerEmpty}>
      <Text lineBreakMode="tail" numberOfLines={1} style={styles.carTitle}>
        {`${props.make} ${props.model}`.replace(/\b\w/g, l => l.toUpperCase())}
      </Text>
      <Text style={styles.text}>
        {`${props.yearOfManufacture}`} {'\u00B7'} 54 Followers
      </Text>
    </View>
  </View>
)};
