import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ListView,
} from 'react-native'
import { FitImage } from '../../Image'
import { ListVideo } from '../../Video/ListVideo';
import { Timeline } from '../../Scenes';
//importing styles
import background from '../../../Themes/background';

const compareTimelineItems = (itemA, itemB) => {

    let itemAScore = 0;
    let itemBScore = 0;
    
    if(itemA.socialData) {
        itemAScore = itemA.socialData.commentsCount + itemA.socialData.likesCount;
    }

    if(itemB.socialData) {
        itemBScore = itemB.socialData.commentsCount + itemB.socialData.likesCount;
    }
    
    return itemAScore - itemBScore;
}

const getFeaturedItemContentUris = (timeline) => {

    if(!timeline){
        return [];
    }

    const filteredItems = timeline.filter(item => {
        if(item.type === "Image" || item.type === "Video"){
            return item;
        }
    });

    filteredItems.sort(compareTimelineItems)

    let uriInfo = [];
     filteredItems.forEach(element => {
         const uris = element.activityData.contentUris.map(uri => {
             return {
                 type:element.type,
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
        return <ListVideo key={item.uri} paused={true} uri={item.uri} onVideoPress={() => this.paused = false} />
    }
}

export class Overview extends Component<any, any> {

    constructor(props) {
        super(props)
    }

    render() {
        const { timeline, timelineProps } = this.props;
        const uriInfo = getFeaturedItemContentUris(timeline);
        console.log(uriInfo)
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
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
                <Timeline {...timelineProps}/>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({

    scrollView: {
        height: 300,
        //flex:1
    },
    container: {
        height: 400,
        backgroundColor: background.color,
  },
    headingContainer: {
        flexDirection: 'row'
    } as React.ViewStyle,
    featuredContainer: {
        flex: 1,
        flexDirection: 'row',
        //height: 300
    } as React.ViewStyle,
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
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