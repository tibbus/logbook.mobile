import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

const styles = StyleSheet.create({
  commentView: {
    flex: 1,
    flexDirection:'row',
    height: 40,
    backgroundColor: '#f2f2f2'
  } as React.ViewStyle,
  profileImg: {
    width: 30,
    height: 30
  }
})

export const Comment = ({ text, profileImg, timeAgo }) => (
  <View style={styles.commentView}>
    <View style={{paddingHorizontal: 10, backgroundColor: '#f2f2f2'}}>
      <Image source={{uri: profileImg}} style={styles.profileImg}/>
    </View>
    <View style={{flex:1, paddingVertical: 5, backgroundColor: '#f2f2f2'}}>
      <Text>{text}</Text>
    </View>
    <View style={{paddingHorizontal: 5, backgroundColor: '#f2f2f2'}}>
      <Text style={{color:'#a9a9a9', fontSize: 9}}>{timeAgo}</Text>
    </View>
  </View>
)
