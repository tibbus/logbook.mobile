import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
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
      <Modal content={<FitImage key={contentUri} source={{ uri: contentUri }} />}>
        <Image key={contentUri} source={{ uri: contentUri }} style={styles.photo} />
      </Modal>
    );
  }

  if (type === "Video") {
    return (
      <Modal content={<LBVideo key={contentUri} paused={false} uri={contentUri} />}>
        <LBVideo key={contentUri} paused={true} playable={false} uri={contentUri} style={styles.video} />
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
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.horizontalScrollView}>
          {
            this.videos.map((video) => galleryContent(video, 'Video'))
          }
        </ScrollView>
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
