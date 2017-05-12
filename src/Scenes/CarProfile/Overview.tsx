import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';

var Lightbox = require('react-native-lightbox');

import { LBVideo } from '../../Components/Video';
import { Timeline } from './Timeline';
//importing styles
import background from '../../Styles/Themes/background';
import palette from '../../Styles/Themes/palette'

const compareTimelineItems = (itemA, itemB) => {
  let itemAScore = 0;
  let itemBScore = 0;

  if (itemA.socialData) {
    itemAScore = itemA.socialData.commentsCount + itemA.socialData.likesCount;
  }

  if (itemB.socialData) {
    itemBScore = itemB.socialData.commentsCount + itemB.socialData.likesCount;
  }

  return itemAScore - itemBScore;
}

const getFeaturedItemContentUris = (timeline) => {

  if (!timeline) {
    return [];
  }

  const filteredItems = timeline.filter(item => {
    if (item.type === "Image" || item.type === "Video") {
      return item;
    }
  });

  filteredItems.sort(compareTimelineItems)

  let uriInfo = [];
  filteredItems.forEach(element => {
    const uris = element.activityData.contentUris.map(uri => {
      return {
        type: element.type,
        uri: uri
      }
    });

    uriInfo = uriInfo.concat(uris);
  });

  return uriInfo;
}

const featuredViewItem = (item) => {

  if (item.type === "Image") {
    return <Lightbox><Image key={item.uri} source={{ uri: item.uri }} style={styles.photo}/></Lightbox>
  }

  if (item.type === "Video") {
    return <LBVideo key={item.uri} paused={true} uri={item.uri} style={styles.photo} />
  }
}

export class Overview extends Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
    const { timeline, timelineProps, tabView } = this.props;
    const uriInfo = getFeaturedItemContentUris(timeline);

    return (
      <View
        style={styles.scrollView}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingFirstTitle}>FEATURED</Text>
            <TouchableOpacity onPress={() => tabView.goToPage(2)}>
              <Text style={styles.headingSecondTitle}>View Showcase > </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredContainer}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              style={styles.horizontalScrollView}>
              {
                uriInfo.map((item) => featuredViewItem(item))
              }
            </ScrollView>
          </View>
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingFirstTitle}>HIGHLIGHTS</Text>
          <TouchableOpacity onPress={() => tabView.goToPage(1)}>
            <Text style={styles.headingSecondTitle}>View Timeline > </Text>
          </TouchableOpacity>
        </View>
        <Timeline {...timelineProps} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  scrollView: {
    flex: 1
  },
  container: {
    height: 400,
    backgroundColor: background.color,
  },
  headingContainer: {
    flex:1,
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5
  } as React.ViewStyle,
  headingFirstTitle: {
    flex:1.5,
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    paddingLeft: 20
  } as React.ViewStyle,
  headingSecondTitle: {
    flex:1,
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: '400',
    color: palette.inactive,
    paddingRight: 10
  } as React.ViewStyle,
  featuredContainer: {
    //height: 300
  } as React.ViewStyle,
  horizontalScrollView: {
    //height: 300
  },
  photo: {  
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
});