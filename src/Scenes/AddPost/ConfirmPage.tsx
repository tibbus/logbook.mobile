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

import { getTagsView } from './TagsView';
import { getGalleryView } from './GalleryView';
import { getStatusView } from './StatusView';
import { getCarSelectionView } from './CarSelectionView';

export class ConfirmPage extends Component<any, any> {

  constructor(props) {
    super(props)

    const { postDetails } = props;

    if(postDetails) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

      this.state = {
        tagsDataSource: ds.cloneWithRows(postDetails.tags),
        contentDataSource:  ds.cloneWithRows(postDetails.content.data)
      }
    }
  }

  render() {
    const { navigator, rootNav, cars, onCancelClick, onPostClick, postDetails, user } = this.props;

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
        {getStatusView(false, null, postDetails.description, user.profileImg)}
        <View style={styles.tagsView}>
          {getTagsView(this.state.tagsDataSource)}
        </View>
        <View style={styles.emptyContainer}>
          {getGalleryView(this.state.contentDataSource, null, false)}
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
  },
   headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {
  },
  headerButtonText: {
    fontWeight: "600",
  },
  headerHeadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerHeadingText: {
  },
    contentContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center', 
    paddingVertical: 10,
    backgroundColor: background.color,
  },
  tagsView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 60,
  },
   emptyContainer: {
    flex: 3,
    backgroundColor: background.color,
  },
  postActionButton: {
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: palette.primary,
    justifyContent: "space-around",
    height: 30,
    marginHorizontal: 10
  },
  postActionButtonText: {
    flex: 1,
    fontSize: 20,
    color: 'white'
  },
  postActionButtonContainer: {
    paddingHorizontal: 10,
    borderRadius: 5,
  },
})

