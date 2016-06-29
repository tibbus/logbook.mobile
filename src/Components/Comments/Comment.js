import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

const styles = StyleSheet.create({
  comment: {

  },
  profileImg: {
    width: 30,
    height: 30
  }
})

export const Comment = ({ text, profileImg }) => (
  <View>
    <Image
      source={{uri: profileImg}}
      style={styles.profileImg}
     />
    <Text>{text}</Text>
  </View>
)
