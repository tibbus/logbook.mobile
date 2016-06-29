import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { FitImage } from '../Image'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Status = (data = {}) => {
  const { details = {}, pending, onMenuPress, user = {} } = data
  const {
    profileImg = 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png',
    commentCount,
    contentUris = [],
    likeCount,
    description,
    timeAgo
  } = details
  const { name } = user

  return (
    <View style={[styles.container, pending ? styles.pending : {}]}>
      <View style={styles.eventHeader}>
        <Image
          source={{uri: profileImg}}
          style={styles.icon}
        />
        <View style={styles.userDetails}>
          <View style={{flex: 1}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{timeAgo}</Text>
          </View>
        </View>
        <TouchableHighlight onPress={() => onMenuPress(details)} underlayColor='#f0f0f0'>
          <Icon name='more-vert' style={styles.moreIcon} />
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
        <View>
          {
            contentUris.map(uri => (
              <FitImage
                key={uri}
                resizeMode={Image.resizeMode.contain}
                source={{uri}}
                style={styles.image} />
            ))
          }
        </View>
      </View>
      <View style={styles.eventFooter}>
        <View style={[styles.flex, { justifyContent: 'center' }]}>
          <Icon name='thumb-up'> {likeCount}</Icon>
        </View>
        <Text>
          {commentCount} comments
        </Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  pending: {
    opacity: 0.5
  },
  description: {
    paddingTop: 10
  },
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
    flexDirection: 'row'
  },
  userDetails: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1
  },
  name: {
    fontWeight: 'bold'
  },
  moreIcon: {
    fontSize: 16,
    padding: 5,
    flex: 1
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
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})
