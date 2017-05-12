import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LBVideo } from '../../Components/Video';

import pallete from '../../Styles/Themes/palette';

export const getGalleryView = (galleryDataSource?, onAddMediaClick?, showAddMediaButton = true) => {
  return (
    <View style={styles.galleryContainer}>
      {
        (galleryDataSource.getRowCount() > 0 && galleryDataSource.getRowCount() < 3 && showAddMediaButton) ? showAddMedia(onAddMediaClick) : null
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
    return <Image key={data.uri} resizeMode={Image.resizeMode.contain} source={{ uri: data.uri }} style={styles.postPhoto} />
  }

  if (data.type === "video") {
    // @TODO removed because undefined
    return <LBVideo key={data.uri} paused={true} uri={data.uri} height={120} width={170}/>;
  }
}

const showAddMedia = (onAddMediaClick) => {
  return (
    <TouchableHighlight style={styles.addMediaIconWrapper} onPress={onAddMediaClick}>
      <View style={styles.addMediaIconView}>
        <Icon name='plus-circle' style={styles.addMediaIcon} />
        <Text style={styles.addMediaIconText}>Add Media</Text>
      </View>
    </TouchableHighlight>
  )
}

const photoWidth = 120;
const photoHeight = 120;

const styles = StyleSheet.create({
  postPhoto: {
    height: photoWidth,
    width: photoHeight,
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
  galleryContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  addMediaIconView: {
    alignItems: 'center'
  },
  addMediaIconWrapper: {
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        width: photoWidth,
        height: photoHeight,
        margin: 3,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
  } as React.ViewStyle,
  addMediaIcon: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: pallete.secondary
  } as React.ViewStyle,
  addMediaIconText: {
      fontSize: 11,
      color: pallete.secondary
  } as React.ViewStyle,
})