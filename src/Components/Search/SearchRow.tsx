
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
//import styles
import background from '../../Styles/Themes/background';
import navBar from '../../Styles/Themes/navBar';
import text from '../../Styles/Themes/text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    //marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: background.component,
    borderTopWidth: 2,
    borderTopColor: background.color,
  } as React.ViewStyle,
  containerEmpty: {
    flex: 1,
    flexDirection: 'column',
  } as React.ViewStyle,
  text: {
    marginLeft: 20,
    fontSize: 15,
    color: text.secondaryHeading,
  },
  carTitle: {
    marginLeft: 20,
    fontSize: 21,
    fontWeight: "700",
  } as React.TextStyle,
  photo: {
    height: 70,
    width: 100,
    borderRadius: 5,
  },
});

const viewCar = (navigator, carInfoId) => {
  navigator.push({
    id: 'car',
    passProps: {
      carInfoId: parseInt(carInfoId),
    }
  })
}

const getSearchResultRowView = (props) => {
    const imageUrl = props.image ? props.image : 'http://www.carlotfinance.com/assets/img/car_profile_placeholder.jpg'
    const carInfoId = props.carInfoId;
    const navigator = props.navigator;
    return (
      <View style={styles.container}>
          <Image source={{ uri: imageUrl}} style={styles.photo} />
          <View style={styles.containerEmpty}>
            <Text lineBreakMode="tail" numberOfLines={1} style={styles.carTitle}>
              {`${props.make} ${props.model}`.replace(/\b\w/g, l => l.toUpperCase())}
            </Text>
            <Text style={styles.text}>
              {`${props.yearOfManufacture}`} {'\u00B7'} 54 Followers    >
            </Text>
          </View>
      </View>
    )
}

export const SearchRow = (props) => {
  const imageUrl = props.image ? props.image : 'http://www.carlotfinance.com/assets/img/car_profile_placeholder.jpg'
  const carInfoId = props.carInfoId;
  const navigator = props.navigator;
  return (
    <TouchableHighlight onPress={() => viewCar(navigator, carInfoId)}>
      {getSearchResultRowView(props)}
    </TouchableHighlight>
)};
