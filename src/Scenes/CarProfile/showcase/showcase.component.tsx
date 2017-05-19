import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ListView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { FitImage } from '../../../Components/FitImage/FitImage.component';
import { LBVideo } from '../../../Components/Video';
import { styles } from './showcase.styles';

const galleryContent = (contentUri, type) => {

  if (type === "Image") {
    // @TODO Image.resizeMode.contain replaced with fixed
    return <FitImage key={contentUri} source={{ uri: contentUri }} style={styles.photo} />
  }

  if (type === "Video") {
    return <LBVideo key={contentUri} paused={true} uri={contentUri} />;
  }
}

const getContentUris = (post) => post.contentUris;

export class ShowCase extends Component<any, any> {
  public videos = [];
  public images = [];


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
      console.log(imagesList)
      this.images = [].concat.apply([], imagesList);
      console.log(this.images)
    }

    this.videos = [];
    if (carVideos.length !== 0) {
      const videoList = carVideos.map(getContentUris);
      console.log(videoList)
      this.videos = [].concat.apply([], videoList);
      console.log(this.videos)
    }

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      imageDataSource: ds.cloneWithRows(this.images),
      videoDataSource: ds.cloneWithRows(this.videos)
    });
  }

  public getVideos = () => {
    if (this.videos.length === 0) {
      return null;
    }

    return (
      <View style={{ height: 200 }}>
        <Text>Videos</Text>
        <ScrollView automaticallyAdjustContentInsets={false}
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
        <Text>Photos</Text>
        <ListView dataSource={this.state.imageDataSource}
          renderRow={(data) => !data ? <Text>No Images</Text> : galleryContent(data, 'Image')}
          enableEmptySections={true}
          contentContainerStyle={styles.listImages}
          scrollEnabled={false}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.scrollView}>
        {this.getVideos()}
        {this.getPhotos()}
      </View>
    );
  }
}
