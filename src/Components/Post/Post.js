import React from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { ListVideo } from '../Video/ListVideo';
import { FitImage } from '../Image';
import Icon from 'react-native-vector-icons/MaterialIcons';
//importing styles
import background from '../../Themes/background';
import comments from '../../Themes/comments';
import icon from '../../Themes/icon';
import text from '../../Themes/text';

const renderMedia = (type, data) => {
  const { details, paused = true, onVideoPress } = data
  const { contentUris } = details

  switch (type) {
    case 'Image':
      return contentUris.map(uri => (
        <FitImage
          key={uri}
          resizeMode={Image.resizeMode.contain}
          source={{uri}}
          style={styles.image} />
      ))

    case 'Video':
      return contentUris.map(uri => (
        <ListVideo
          key={uri}
          paused={paused}
          uri={uri}
          onVideoPress={() => onVideoPress(data)} />
      ))

    default:
      return null
  }
}

export const Post = (data = {}) => {
  const { details = {}, pending, onMenuPress, type, user = {} } = data;
  profileImg = '';
  if(details.carData === undefined || details.carData.image === undefined || details.carData.image === null){
    profileImg = 'https://maxcdn.icons8.com/iOS7/PNG/75/Users/user_male_circle_filled-75.png';
  }
  else{
    profileImg = details.carData.image;
  }
  const {
    commentCount = (details.socialData === undefined || details.socialData.commentsCount === undefined) ? 0 : details.socialData.commentsCount,
    likeCount = (details.socialData === undefined || details.socialData.likesCount === undefined) ? 0 : details.socialData.likesCount,
    description = details.activityData.description,
    timeAgo
  } = details;
  const { name } = user

  return (
    <View style={[styles.containerEmpty, pending ? styles.pending : {}]}>
      <View style={[styles.container, pending ? styles.pending : {}]}>
        <View style={styles.eventHeader}>
          <Image
            source={{uri: profileImg}}
            style={styles.icon} />
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
      </View>
      <View style={[styles.containerEmpty, pending ? styles.pending : {}]}>
        <View style={styles.break}>
        </View>
      </View>
      <View style={[styles.container, pending ? styles.pending : {}]}>
        <View>
          <Text style={styles.description}>{description}</Text>
          <View>
            {renderMedia(type, data)}
          </View>
        </View>
        <View style={styles.eventFooter}>
          <View style={[styles.flex, { justifyContent: 'center' }]}>
            <Text style={styles.likes}>{likeCount} <Icon name='favorite-border' style={styles.heartIcon}/></Text>
          </View>
        </View>
      </View>
      <View style={[styles.containerEmpty, pending ? styles.pending : {}]}>
        <View style={styles.viewComments}>
          <Text style={styles.viewCommentsText}>
            View {commentCount} comments
          </Text>

        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  pending: {
    opacity: 0.5
  },
  description: {
    fontSize: 20,
    //lineHeight: 10,
    //try not to use letterSpacing - iOS only
    letterSpacing: 0.5,
    paddingTop: 10,
    paddingBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  break: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: background.color,
  },
  container: {
    padding: 20,
    paddingTop: 20,
    backgroundColor: background.component,
  },
  containerEmpty: {
    padding: 0,
    paddingTop: 0,
    backgroundColor: background.component,
  },
  eventHeader: {
    flexDirection: 'row',
  },
  heartIcon: {
    color: icon.active,
    fontSize: 20,
  },
  likes: {
    color: icon.inactive,
    textAlign: 'right',
  },
  userDetails: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  name: {
    fontWeight: 'bold',
    color: 'red',
  },
  moreIcon: {
    fontSize: 12,
    flex: 1,
    padding: 5,
    paddingTop: 15,
  },
  date: {
    color: text.secondaryText,
    textAlign: 'right',
  },
  eventFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    paddingTop: 5
  },
  flex: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  viewComments: {
    backgroundColor: comments.viewCommentsBgd,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  viewCommentsText: {
    color: text.secondaryText,
    textAlign: 'center',
  }
})
