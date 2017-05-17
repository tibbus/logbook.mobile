import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import palette from '../../Styles/Themes/palette';

export const Comment = ({ text, profileImg, timeAgo }) => (
  <View style={styles.commentView}>
    <Image source={{ uri: profileImg }} style={styles.profileImg} />
    <Text style={styles.commentText}>{text}</Text>
    <Text style={styles.date}>{timeAgo}</Text>
  </View>
);

const styles = StyleSheet.create({
  commentView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20
  },
  profileImg: {
    width: 26,
    height: 26,
    borderRadius: 13
  },
  commentText: {
    flex: 7,
    marginTop: 5,
    marginLeft: 15,
    left: 1
  },
  date: {
    flex: 3,
    marginTop: 5,
    color: palette.date,
    fontSize: 9,
    textAlign: 'right'
  }
});
