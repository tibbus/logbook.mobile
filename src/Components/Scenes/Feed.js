import React, { Component } from 'react';
import {
  ListView,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { getUserFeed } from '../../Actions/feed'
import { LoadingView } from '../LoadingView';
import background from '../../Themes/background';

const stateToProps = ({ user, feed }) => ({ user, feed });

@connect(stateToProps)
export class Feed extends Component {
    
    constructor(props) {
        super(props)

        const { user, dispatch, feed } = this.props;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        dispatch(getUserFeed(user.id))

        this.state = {
            dataSource: ds.cloneWithRows(feed)
        }
    }

    componentWillReceiveProps ({ feed }) {
        //Commenting to prevent ddos :D
        /*if(likes !== this.props.likes) {
        const { dispatch } = this.props;
        dispatch(getUserLikedPosts(this.userId));
        }*/

        if (feed !== this.props.feed) {
        const { dispatch } = this.props;

        feed.forEach((feedItem) => {
            //dispatch(setTimelineComments(timelineItem.activityData.id));
            //dispatch(getTimelineComments(timelineItem.activityData.id));
        })

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(feed)        
        })
        }
    }

    renderRow (post) {
        const { user, carOwner, comments, dispatch, likes = [] } = this.props;
        const { carInfoId }  = post.activityData;
        const likedItem = likes.find(element => element.postId === post.activityData.id);
        const liked = !!likedItem;
        const props = {
            ...post,
            onMenuPress: () => console.log('menu press'),
            onVideoPress: () => console.log('video play press'),
            onLikePress: () => console.log('like press'),
            onUnlikePress: () => console.log('unlike press'),
            carOwner,
            liked
        }

        /*const filteredComments = comments.find((timelinePostComments) => {
        return timelinePostComments.timelinePostId === post.activityData.id
        });

        var postComments = [];
        if(filteredComments) {
            postComments = filteredComments.comments.map((postComment) => {
            return {
                text: postComment.comment,
                profileImg: 'https://mycarbiostolocal.blob.core.windows.net/default0/Image/01010001/4d47ecd5-c26a-474c-8001-4587e2365a19/DefaultProfileImage.jpg',
                timeAgo: postComment.timeAgo
            };
            });
        }*/
                        
        return (
            <View style={styles.row}>
                {getPost(props)}
                {/*<Comments comments={postComments} />
                <CommentInput props={props} onSubmitEditing={(timelinePostId, userId, commentText) => {
                dispatch(addComment(timelinePostId, userId, commentText))}

                }*/} />
            </View>
        )
    }

    render () {
        return (
        <LoadingView style={styles.container}
            isLoading={false}>
            <ListView
            contentContainerStyle={{ justifyContent: 'center' }}
            style={styles.container}
            dataSource={this.state.dataSource}
            enableEmptySections={Boolean(true)}
            renderRow={this.renderRow.bind(this)} />
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
    height: 400,
    //flex: 1,
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