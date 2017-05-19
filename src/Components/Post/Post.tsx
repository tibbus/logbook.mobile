import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { LBVideo } from '../Video';
import { FitImage } from '../FitImage/FitImage.component';
import { styles } from './Post.styles';

const renderMedia = (type, data) => {
  const { paused = true, onVideoPress } = data;
  const details = data;
  const { contentUris } = details.activityData;

  switch (type) {
    case 'Image':
      return contentUris.map(uri => <FitImage key={uri} source={{ uri }} fitToWidth={true} />);

    case 'Video':
      return contentUris.map(uri => <LBVideo key={uri} paused={paused} uri={uri} height={250} />);

    default:
      return null
  }
}

const getViewCar = (isFeed, onViewCarPress) => {
  if (isFeed) {
    return (
      <TouchableHighlight onPress={onViewCarPress}>
        <Text>View Car ></Text>
      </TouchableHighlight>
    );
  }
  return null;
};

const renderLikes = (liked, onLikePress, onUnlikePress, likeCount) => (
  <TouchableHighlight onPress={liked ? onUnlikePress : onLikePress}>
    <View style={styles.likesWrapper}>
      <Text style={styles.likesCount}>{likeCount}</Text>
      <Icon name={liked ? 'heart' : 'heart-o'} style={styles.heartIcon} />
    </View>
  </TouchableHighlight>
);

interface postData {
  details: any,
  pending: any,
  onMenuPress: any,
  onLikePress: any,
  onUnlikePress: any,
  type: any,
  carOwner: any,
  liked: any,
  isFeed: any,
  onViewCarPress: any
}

export const Post = (data: any = {}) => {
  const {pending, onMenuPress, onLikePress, onUnlikePress, type, carOwner = {}, liked, isFeed, onViewCarPress }: postData = data;
  // @todo : review exactly what data need to be here
  const details = data;

  let profileImg = '';
  if (carOwner === undefined || carOwner.profileImg === undefined || carOwner.profileImg === "") {
    profileImg = 'https://maxcdn.icons8.com/iOS7/PNG/75/carOwners/carOwner_male_circle_filled-75.png';
  }
  else {
    profileImg = carOwner.profileImg;
  }
  const {
    commentCount = (details.socialData === undefined || details.socialData.commentsCount === undefined) ? 0 : details.socialData.commentsCount,
    likeCount = (details.socialData === undefined || details.socialData.likesCount === undefined) ? 0 : details.socialData.likesCount,
    description = details.activityData.description,
    timeAgo,
    interests = details.activityData.topics
  } = details;
  const { name } = carOwner;

  return (
    <View style={{ flex: 1 }}>
      {renderMedia(type, data)}

      <View style={styles.infoWrapper}>
        <Image source={{ uri: details.carData.image }} style={styles.carPhoto} />
        <Text numberOfLines={1} style={styles.carName}>{details.carData.make} {details.carData.model}</Text>
        <Text style={styles.date}>{timeAgo}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {renderLikes(liked, onLikePress, onUnlikePress, likeCount)}
      </View>
    </View>
  );
}
