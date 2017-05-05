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
import { getPost } from '../../Post';
import { Comments, CommentInput } from '../../Comments';
//importing styles
import background from '../../../Themes/background';

const compareTimelineItems = (itemA, itemB) => {
    const itemAScore = itemA.socialData.commentsCount + itemA.socialData.likesCount;
    const itemBScore = itemB.socialData.commentsCount + itemB.socialData.likesCount;

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
        
        let { timeline } = this.props;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        if(!timeline){
            timeline = [];
        }
        else {
            timeline = timeline.slice(0, 3);
        }
        this.state = {
            dataSource: ds.cloneWithRows(timeline)
        }
    }

    playVideo(post) {
        const { dispatch, playVideoAction, pauseVideoAction } = this.props
        const { details, paused = true } = post
        const { carInfoId, id } = details
        const action = paused ? playVideoAction : pauseVideoAction

        dispatch(action(carInfoId, id))
  }

    renderRow(post) {
        const { user, carOwner, comments, dispatch, likes = [], likePost, unlikeTimelinePost, addComment } = this.props;
        const { carInfoId } = post.activityData;
        const likedItem = likes.find(element => element.postId === post.activityData.id);
        const liked = !!likedItem;
        const props = {
            ...post,
            // @TODO showStatusMenu not defined ??
            //onMenuPress: () => this.showStatusMenu(post),
            onVideoPress: this.playVideo.bind(this),
            onLikePress: () => dispatch(likePost(post.activityData.id, 'Timeline', user.id, carInfoId)),
            onUnlikePress: () => dispatch(unlikeTimelinePost(likedItem.id, likedItem.postId, carInfoId)),
            carOwner,
            user,
            liked
        }

        const filteredComments = comments.find((timelinePostComments) => {
            return timelinePostComments.timelinePostId === post.activityData.id
        });

        var postComments = [];
        if (filteredComments) {
            postComments = filteredComments.comments.map((postComment) => {
                return {
                text: postComment.comment,
                profileImg: 'https://mycarbiostolocal.blob.core.windows.net/default0/Image/01010001/4d47ecd5-c26a-474c-8001-4587e2365a19/DefaultProfileImage.jpg',
                timeAgo: postComment.timeAgo
                };
            });
        }

        return (
            <View style={styles.row}>
                {getPost(props)}
                <Comments comments={postComments} />
                <CommentInput props={props} onSubmitEditing={(timelinePostId, userId, commentText) => {
                    dispatch(addComment(timelinePostId, userId, commentText))
                }} />
            </View>
        )
    }

    render() {
        const { car, timeline } = this.props;
        if(timeline) {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.state = {
            dataSource: ds.cloneWithRows(timeline.slice(0,3))
        }
        }
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
                <ListView
                    contentContainerStyle={{ justifyContent: 'center' }}
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    enableEmptySections={Boolean(true)}
                    renderRow={this.renderRow.bind(this)} />
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
    //flex: 1,
    //marginLeft: 5,
    //marginRight: 5,
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