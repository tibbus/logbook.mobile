import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

import { FitImage } from '../../../Components/FitImage/FitImage.component';
import { LBVideo } from '../../../Components/Video/LBVideo.component';
import { LBModal as Modal } from '../../../Components/Modal/Modal.component';
import { styles } from './showcase.styles';

const galleryContent = (contentUri, type) => {

  if (type === "Image") {
    return (
      <Modal key={contentUri} content={<FitImage source={{ uri: contentUri }} />}>
        <FitImage source={{ uri: contentUri }} style={styles.media} />
      </Modal>
    );
  }

  if (type === "Video") {
    return (
      <Modal key={contentUri} content={<LBVideo key={contentUri} paused={false} source={{ uri: contentUri }} />}>
        <LBVideo paused={true} playable={false} source={{ uri: contentUri }} style={styles.media} />
      </Modal>
    );
  }
}

const getContentUris = (post) => post.contentUris;

export class ShowCase extends Component<any, any> {
  public videos = [];
  public images = [];
  private windowWidth;


  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      imageDataSource: ds.cloneWithRows(this.images),
      videoDataSource: ds.cloneWithRows(this.videos)
    };
  }

  componentDidMount() {
    const { carImages, carVideos } = this.props;
    if (carImages.length !== 0) {
      const imagesList = carImages.map(getContentUris);
      this.images = [].concat.apply([], imagesList);
    }

    this.videos = [];
    if (carVideos.length !== 0) {
      const videoList = carVideos.map(getContentUris);
      this.videos = [].concat.apply([], videoList);
    }

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      imageDataSource: ds.cloneWithRows(this.images),
      videoDataSource: ds.cloneWithRows(this.videos)
    });

    this.windowWidth = Dimensions.get("window").width;
  }

  public getVideos = () => {
    if (this.videos.length === 0) {
      return null;
    }

    return (
      <View>
        <Text style={styles.mediaText}>Videos</Text>
        <ListView dataSource={this.state.videoDataSource}
          renderRow={(data) => !data ? <Text>No Videos</Text> : galleryContent(data, 'Video')}
          enableEmptySections={true}
          contentContainerStyle={styles.imagesContainer}
          scrollEnabled={false}
        />
      </View>
    );
  }

  public getPhotos = () => {
    if (this.images.length === 0) {
      return null;
    }

    return (
      <View>
        <Text style={[styles.mediaText, styles.photosText]}>Photos</Text>
        <ListView dataSource={this.state.imageDataSource}
          renderRow={(data) => !data ? <Text>No Images</Text> : galleryContent(data, 'Image')}
          enableEmptySections={true}
          contentContainerStyle={styles.imagesContainer}
          scrollEnabled={false}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.getVideos()}
        {this.getPhotos()}
      </View>
    );
  }
}
