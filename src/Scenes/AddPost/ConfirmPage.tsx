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
import background from '../../Styles/Themes/background';
import palette from '../../Styles/Themes/palette';

import { FitImage } from '../../Components/Image';
import { getTagsView } from './TagsView';
import { getGalleryView } from './GalleryView';
import { getStatusView } from './StatusView';
import { getCarSelectionView } from './CarSelectionView';

export class ConfirmPage extends Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
    const { navigator, rootNav, cars, onCancelClick, onPostClick, postDetails } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const tagsDataSource = ds.cloneWithRows(this.props.postDetails.tags);
    const contentDataSource= ds.cloneWithRows(this.props.postDetails.content.data);

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableHighlight style={styles.headerButton} onPress={onCancelClick}>
              <Text style={styles.headerButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.headerHeadingContainer}>
            <Text style={styles.headerHeadingText}>ADD POST</Text>
          </View>
          <View style={styles.headerButtonContainer}>
          </View>
        </View>
        {getCarSelectionView(false, null, null, postDetails.car)}
        {getStatusView(false, null, postDetails.description)}
        <View style={styles.tagsView}>
          {getTagsView(tagsDataSource)}
        </View>
        <View style={styles.emptyContainer}>
          {getGalleryView(contentDataSource, null, false)}
          <View style={styles.contentContainer}>
            <TouchableHighlight style={styles.postActionButton} onPress={() => onPostClick(postDetails)}>
              <View style={styles.postActionButtonContainer}>
                <Text style={styles.postActionButtonText}>Post</Text>
              </View>
            </TouchableHighlight>
          </View>
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
    backgroundColor: background.secondary,
    justifyContent: "space-around",
    alignItems: "center",
  } as React.ViewStyle,
   headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  } as React.ViewStyle,
  headerButton: {
  },
  headerButtonText: {
    fontWeight: "600",
  } as React.TextStyle,
  headerHeadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  } as React.ViewStyle,
  headerHeadingText: {
  },
    contentContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center', 
    paddingVertical: 30,
    backgroundColor: background.color,
  } as React.ViewStyle,
  tagsView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 60,
  } as React.ViewStyle,
   emptyContainer: {
    flex: 3,
    backgroundColor: background.color,
  } as React.ViewStyle,
  postActionButton: {
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 10,
    color: palette.primary,
    backgroundColor: palette.primary,
    justifyContent: "space-around",
  } as React.ViewStyle,
  postActionButtonText: {
    flex: 1,
    fontSize: 20,
    color: 'white'
  } as React.ViewStyle,
  postActionButtonContainer: {
    paddingHorizontal: 10,
    borderRadius: 5,
  } as React.ViewStyle,
})

