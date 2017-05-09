import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

import palette from '../../Styles/Themes/palette';
import screen from '../../Styles/Themes/screen';

export const getStatusView = (editMode, updateStatus, status) => {
  return (
    <View style={styles.contentDescriptionContainer}>
      <Image source={{ uri: 'https://maxcdn.icons8.com/iOS7/PNG/75/Users/user_male_circle_filled-75.png' }} style={styles.icon} />
      {
        editMode ? getStatusInput(updateStatus) : getStatusDisplay(status)
      }

    </View>
  );
}

const getStatusInput = (updateStatus) => {
  return (
    <TextInput
      onChangeText={(text) => updateStatus(text)}
      placeholder="What's new with car term today? Feeling like cruising? Thing? Or something?"
      placeholderTextColor={palette.inactive}
      returnKeyType='done'
      maxLength={200}
      multiline={true}
      style={styles.statusInput} />
  )
}

const getStatusDisplay = (status) => {
  return (
    <Text style={styles.statusDisplay}>{status}</Text>
  )
}

const styles = StyleSheet.create({
  contentDescriptionContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: screen.paddingHorizontal,
  },
  icon: {
    height: screen.addPostProfileDimensions,
    width: screen.addPostProfileDimensions,
    borderRadius: screen.addPostProfileDimensions / 2,
  },
  statusInput: {
    flex: 1,
    height: 80,
    fontSize: 20,
    lineHeight: 200,
    color: 'black',
    marginTop: 10,
    // backgroundColor: 'black'
  },
  statusDisplay: {
    flex:1,
    marginTop: 10,
    fontSize: 20
  }
})