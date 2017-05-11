import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ListView,
} from 'react-native';

import { FitImage } from '../../Components/Image'
import { LBVideo } from '../../Components/Video';
import { Timeline } from './Timeline';
//importing styles
import background from '../../Styles/Themes/background';

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
    return <FitImage key={item.uri} resizeMode={Image.resizeMode.contain} source={{ uri: item.uri }} style={styles.photo} />
  }

  if (item.type === "Video") {
    return <LBVideo key={item.uri} paused={true} uri={item.uri} />
  }
}

export class Overview extends Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
    const { timeline, timelineProps } = this.props;
    const uriInfo = getFeaturedItemContentUris(timeline);

    return (
      <View
        style={styles.scrollView}>
        <View>
          <View style={styles.headingContainer}>
            <Text>Featured</Text>
            <Text>View Showcase > </Text>
          </View>
          <View style={styles.featuredContainer}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              style={styles.horizontalScrollView}
            >
              {
                uriInfo.map((item) => featuredViewItem(item))
              }
            </ScrollView>
          </View>
        </View>
        <View style={styles.headingContainer}>
          <Text>Highlights</Text>
          <Text>View Timeline > </Text>
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
  } as React.ViewStyle,
  featuredContainer: {
    //height: 300
  } as React.ViewStyle,
  horizontalScrollView: {
    //height: 300
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
});