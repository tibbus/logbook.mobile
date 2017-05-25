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

import { LBModal as Modal } from '../../../Components/Modal/Modal.component';
import { LBVideo } from '../../../Components/Video/LBVideo.component';
import { FitImage } from '../../../Components/FitImage/FitImage.component';
import { Timeline } from '../../../Components/timeline/timeline.component';
import { styles } from './overview.styles';

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
    return <Modal content={<FitImage key={item.uri} source={{ uri: item.uri }} />}>
      <Image key={item.uri} source={{ uri: item.uri }} style={styles.media} />
    </Modal>
  }

  if (item.type === "Video") {
    return <Modal content={<LBVideo key={item.uri} paused={false} uri={item.uri} />}>
      <LBVideo key={item.uri} paused={true} playable={false} uri={item.uri} style={[styles.media, styles.video]} />
    </Modal>
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
      <View style={styles.scrollView}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingFirstTitle}>FEATURED</Text>
            <TouchableOpacity onPress={() => tabView.goToPage(2)}>
              <Text style={styles.headingSecondTitle}>View Showcase > </Text>
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal={true}>
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
