import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  eventHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  userDetails: {
    paddingLeft: 5,
    paddingRight: 5
  },
  name: {
    fontWeight: 'bold'
  },
  date: {
    color: '#a0a0a0'
  },
  eventFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    marginTop: 5,
    paddingTop: 5
  },
  flex: {
    flex: 1
  }
})

export const Status = ({
  profileImg,
  commentCount,
  likeCount,
  text,
  type,
  name
}) => (
  <View style={styles.container}>
    <View style={styles.eventHeader}>
      <Image
        source={{uri: profileImg}}
        style={styles.icon}
      />
      <View style={styles.userDetails}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>35 mins ago</Text>
      </View>
    </View>
    <View>
      <Text>{text}</Text>
    </View>
    <View style={styles.eventFooter}>
      <View style={styles.flex}><Icon name='thumbs-up'> {likeCount}</Icon></View>
      <Text>
        {commentCount} comments
      </Text>
    </View>
  </View>
)
