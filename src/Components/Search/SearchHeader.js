import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

//import styles
import background from '../../Themes/background';
import search from '../../Themes/search';
import text from '../../Themes/text';

const styles = StyleSheet.create({
  containerTop: {
    top: 0,
    flex: 1,
    padding: 30,
    backgroundColor: background.component,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    //top: 0,
    flex: 1,
    //padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 17,
    backgroundColor: search.searchBox,
    borderRadius: 5,
    paddingLeft: 20,
  },
  titleText: {
    flex: 1,
    color: text.featureText,
    fontWeight: '800',
    fontSize: 40,
    paddingBottom: 15,
  },
});

export const SearchHeader = ({searchFunction}) => (
  <View style={styles.containerTop}>
    <Text style={styles.titleText}> Search</Text>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for cars..."
        keyboardType="default"
        returnKeyType="search"
        onChangeText={(text) => searchFunction(text)}
      />
    </View>
  </View>
);
