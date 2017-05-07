import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

import { FitImage } from '../../Components/Image';

export const getGalleryView = (galleryDataSource?, onAddMediaClick?) => {
  return (
    <View style={styles.galleryContainer}>
      {
        (galleryDataSource.getRowCount() > 0 && galleryDataSource.getRowCount() < 3) ? showAddMedia(onAddMediaClick) : null
      }
      <ListView
        horizontal={true}
        style={{ flex: 1 }}
        dataSource={galleryDataSource}
        scrollEnabled={false}
        renderRow={(data) => galleryContent(data)}
      />
    </View>
  )
}

const galleryContent = (data) => {

  if (data.type === "image") {
    return <FitImage key={data.uri} resizeMode={Image.resizeMode.contain} source={{ uri: data.uri }} style={styles.postPhoto} />
  }

  if (data.type === "video") {
    // @TODO removed because undefined
    //return <ListVideo key={data.uri} paused={true} uri={data.uri} onVideoPress={() => { this.paused === true ? this.paused = false : this.paused = true }} />;
  }
}

const showAddMedia = (onAddMediaClick) => {
  return (
    <TouchableHighlight onPress={onAddMediaClick}>
      <Text>Add Media</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  postPhoto: {
    height: 120,
    width: 120,
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
  galleryContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})