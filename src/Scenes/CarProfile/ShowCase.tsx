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

import { FitImage } from '../../Components/Image'
import { ListVideo } from '../../Components/Video/ListVideo';

const galleryContent = (contentUri, type) => {

  if (type === "Image") {
    // @TODO Image.resizeMode.contain replaced with fixed
    return <FitImage key={contentUri} resizeMode={Image.resizeMode.contain} source={{ uri: contentUri }} style={styles.photo} />
  }

  if (type === "Video") {
    return <ListVideo key={contentUri} paused={true} uri={contentUri} onVideoPress={() => this.paused = false} />;
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
        <ListView
          dataSource={this.state.imageDataSource}
          renderRow={(data) => !data ? <Text>No Images</Text> : galleryContent(data, 'Image')}
          renderSeperator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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

const styles = StyleSheet.create({
  scrollView: {
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  listImages: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  } as React.ViewStyle,
  horizontalScrollView: {
    height: 200,
    flexDirection: 'row'
  }
});