import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LBVideo } from '../../Components/Video/LBVideo.component';
import { FitImage } from '../../Components/FitImage/FitImage.component';

import pallete from '../../Styles/Themes/palette';

export const getGalleryView = (mediaType?, galleryDataSource?, onAddMediaClick?, showAddMediaButton = true) => {
  return (
    <View style={styles.galleryContainer}>
      {
        (galleryDataSource.getRowCount() > 0 && galleryDataSource.getRowCount() < 3 && showAddMediaButton) ? showAddMedia(onAddMediaClick, mediaType) : null
      }
      <ListView
        horizontal={true}
        style={{ flex: 1 }}
        dataSource={galleryDataSource}
        scrollEnabled={true}
        renderRow={(data) => galleryContent(data)}
      />
    </View>
  )
}

const galleryContent = (data) => {

  if (data.type === "image") {
    return <FitImage key={data.uri} source={{ uri: data.uri }} style={styles.postPhoto} />
  }

  if (data.type === "video") {
    // @TODO removed because undefined
    return <LBVideo key={data.uri} paused={true} source={{ uri: data.uri }} style={{ height: 120, width: 170 }} />;
  }
}

const showAddMedia = (onAddMediaClick, mediaType) => {
  return (
    <TouchableHighlight style={styles.addMediaIconWrapper} onPress={onAddMediaClick}>
      <View style={styles.addMediaIconView}>
        <Icon name='plus-circle' style={styles.addMediaIcon} />
        <Text style={styles.addMediaIconText}>{mediaType === "image" ? "Add Photo" : "Add Video"}</Text>
      </View>
    </TouchableHighlight>
  )
}

const photoWidth = 120;
const photoHeight = 120;

const styles = StyleSheet.create({
  postPhoto: {
    height: photoWidth / 1.2,
    width: photoHeight / 1.2,
    padding: 5,
    margin: 3
  },
  galleryContainer: {
    flexDirection: 'row'
  },
  addMediaIconView: {
    alignItems: 'center'
  },
  addMediaIconWrapper: {
    backgroundColor: '#eaeaea',
    width: photoWidth / 1.2,
    height: photoHeight / 1.2,
    margin: 3,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMediaIcon: {
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: pallete.secondary
  },
  addMediaIconText: {
    fontSize: 11,
    color: pallete.secondary
  },
})