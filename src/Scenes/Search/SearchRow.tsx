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

const getSearchResultRowView = (props) => {
    const imageUrl = props.image ? props.image : 'http://www.carlotfinance.com/assets/img/car_profile_placeholder.jpg'
    let followersCount = 0;
    if(props.followersCount) {
      followersCount = props.followersCount;
    }
    return (
      <View style={styles.container}>
          <Image source={{ uri: imageUrl}} style={styles.photo} />
          <View style={styles.containerEmpty}>
            <Text lineBreakMode="tail" numberOfLines={1} style={styles.carTitle}>
              {`${props.make} ${props.model}`.replace(/\b\w/g, l => l.toUpperCase())}
            </Text>
            <Text style={styles.text}>
              {`${props.yearOfManufacture}`} {'\u00B7'} {`${followersCount} Followers`}    >
            </Text>
          </View>
      </View>
    )
}

export const SearchRow = (props) => {
  const { carInfoId, onViewCarProfile } = props;
  return (
    <TouchableHighlight onPress={() => onViewCarProfile(carInfoId)}>
      {getSearchResultRowView(props)}
    </TouchableHighlight>
)};
