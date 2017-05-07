import React, { Component } from 'react';
import {
    View,
    ListView,
    StyleSheet
} from 'react-native';
import { connect } from '../../Utils/connect';
import { getUserFeed } from '../../Actions/feed'
import { getPost } from '../Post';
import { LoadingView } from '../LoadingView';
import background from '../../Styles/Themes/background';
import { addComment, setTimelineComments, getTimelineComments } from '../../Actions/comments';
import { getUserLikedPosts, likePost, unlikeTimelinePost } from '../../Actions/like';
import { Comments, CommentInput } from '../Comments';

const stateToProps = ({ user, feed, comments, likes }) => ({ user, feed, comments, likes });

@connect(stateToProps)
export class Feed extends Component<any, any> {

    constructor(props) {
        super(props)

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const { user, dispatch, feed = [], comments = [], likes = [] } = this.props;

        dispatch(getUserFeed(user.id))

        if (!likes.length && user.id) {
            dispatch(getUserLikedPosts(user.id));
        }

        const { posts }: any = feed;
        this.state = {
            dataSource: ds.cloneWithRows(posts)
        }
    }

    componentWillReceiveProps({ feed, comments = [], likes = [] }) {
        //Commenting to prevent ddos :D
        /*if(likes !== this.props.likes) {
        const { dispatch } = this.props;
        dispatch(getUserLikedPosts(this.userId));
        }*/

        if (feed !== this.props.feed) {
            const { dispatch } = this.props;

            // @TODO should not fetch comments for every action on the timeline
            feed.posts.forEach((postItem) => {
                if (!comments.find(item => item.timelinePostId === postItem.activityData.id)) {
                    dispatch(setTimelineComments(postItem.activityData.id));
                    dispatch(getTimelineComments(postItem.activityData.id));
                }
                else {
                    dispatch(getTimelineComments(postItem.activityData.id));
                }
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(feed.posts)
            })
        }
    }

    renderRow = post => {
        const { user, navigator, dispatch, comments, likes = [] } = this.props;
        const { carOwner } = post;
        const { carInfoId } = post.activityData;
        const type = post.type;
        const likedItem = likes.find(element => element.postId === post.activityData.id);
        const liked = !!likedItem;
        const isFeed = true;
        const props = {
            details: { ...post },
            type,
            onMenuPress: () => console.log('menu press'),
            onVideoPress: () => console.log('video play press'),
            onLikePress: () => dispatch(likePost(post.activityData.id, 'Timeline', user.id, carInfoId)),
            onUnlikePress: () => dispatch(unlikeTimelinePost(likedItem.id, likedItem.postId, carInfoId)),
            onViewCarPress: () => navigator.push({
                id: 'car',
                passProps: {
                    carInfoId: parseInt(carInfoId),
                }
            }),
            carOwner,
            liked,
            isFeed
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
        const commentProps = {
            ...props.details,
            user
        }

        return (
            <View style={styles.row}>
                {getPost(props)}
                <Comments comments={postComments} />
                <CommentInput props={commentProps} onSubmitEditing={(timelinePostId, userId, commentText) => {
                    dispatch(addComment(timelinePostId, userId, commentText))
                }
                }
                />
            </View>
        )
    }

    render() {
        return (
            <LoadingView style={styles.container}
                isLoading={false}>
                <ListView
                    contentContainerStyle={{ justifyContent: 'center' }}
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    enableEmptySections={Boolean(true)}
                    renderRow={this.renderRow} />
            </LoadingView>
        )
    }

}

const styles = StyleSheet.create({
    commentsSnapshot: {
        backgroundColor: '#efefef'
    },
    modal: {
        padding: 30,
    },
    container: {
        //height: 400,
        flex: 1,
        //marginLeft: 5,
        //marginRight: 5,
        backgroundColor: background.color,
    },
    posts: {
        marginLeft: 15,
        marginRight: 15,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    row: {
        marginTop: 10,
    }
})