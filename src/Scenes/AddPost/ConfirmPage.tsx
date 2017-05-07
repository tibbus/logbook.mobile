import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View,
  ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { FitImage } from '../../Components/Image';
import { getTagsView } from './TagsView';
import { getGalleryView } from './GalleryView';
import { getStatusView } from './StatusView';
import { getCarSelectionView } from './CarSelectionView';

export class ConfirmPage extends Component<any, any> {

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      tagsDataSource: ds.cloneWithRows(this.props.postDetails.tags),
      contentDataSource: ds.cloneWithRows(this.props.postDetails.content.data)
    };
  }

  render() {
    const { navigator, rootNav, cars, onCancelClick, onPostClick, postDetails } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableHighlight style={styles.headerButton} onPress={onCancelClick}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.headerHeadingContainer}>
            <Text style={styles.headerHeadingTextt}>ADD POST</Text>
          </View>
        </View>
        {getCarSelectionView(false, null, null, postDetails.car)}
        {getStatusView(false, null, postDetails.description)}
        <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#000000' }}>
        </View>
        {getTagsView(this.state.tagsDataSource)}
        {getGalleryView(this.state.contentDataSource)}
        <View style={styles.contentContainer}>
          <TouchableHighlight style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }} onPress={() => onPostClick(postDetails)}>
            <Text>Post</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 10
  } as React.ViewStyle,
  headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  } as React.ViewStyle,
  headerButton: {
  },
  headerHeadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50
  } as React.ViewStyle,
  headerHeadingText: {
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  } as React.ViewStyle,
})

