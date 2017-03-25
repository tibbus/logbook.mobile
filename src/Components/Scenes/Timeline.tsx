import React, { Component } from 'react';
import {
  ListView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from '../../Utils/connect';
import {
  pauseVideoAction,
  playVideoAction,
  setCarTimeline
} from '../../Actions/timeline';
import { deletePost } from '../../Actions/post';
import { addComment, setTimelineComments, getTimelineComments } from '../../Actions/comments';
import { getUserLikedPosts, likePost, unlikeTimelinePost } from '../../Actions/like';
import { LoadingView } from '../LoadingView';
import { StatusCreate, StatusEdit, StatusEntrySnapshot } from '../StatusEntry';
import { getPost, PostMenu } from '../Post';
import { Comments, CommentInput } from '../Comments';
//importing styles
import background from '../../Themes/background';

const getTimeline = (timelines, carInfoIdArg) => {
  const timelineDetails = timelines.find(({ carInfoId }) => carInfoId === carInfoIdArg)
  return timelineDetails ? timelineDetails.timeline : []
}


const stateToProps = ({ timelines, comments, likes }) => ({ timelines, comments, likes })

@connect(stateToProps)
export class Timeline extends Component<any, any> {
  private carInfoId: string;
  private userId: string;

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const { car, dispatch, timelines = [], comments = [], likes = [] } = this.props;
    const { carInfo = {} }: { carInfo: any } = car;
    const { user = {} }: { user: any } = this.props;
    this.carInfoId = carInfo.id;
    this.userId = user.id;

    const timeline = getTimeline(timelines, this.carInfoId);

    if (!timeline.length && this.carInfoId) {
      dispatch(setCarTimeline({ carInfoId: this.carInfoId }));
    }

    if (!likes.length && this.userId) {
      dispatch(getUserLikedPosts(this.userId));
    }

    this.state = {
      timeline,
      dataSource: ds.cloneWithRows(timeline)
    }
  }

  componentWillReceiveProps({ car, timelines = [], likes = [] }) {
    //Commenting to prevent ddos :D
    /*if(likes !== this.props.likes) {
      const { dispatch } = this.props;
      dispatch(getUserLikedPosts(this.userId));
    }*/

    if (timelines !== this.props.timelines) {
      const { dispatch } = this.props;
      const timeline = getTimeline(timelines, this.carInfoId);

      // @TODO should not fetch comments for every action on the timeline
      timeline.forEach((timelineItem) => {
        dispatch(setTimelineComments(timelineItem.activityData.id));
        dispatch(getTimelineComments(timelineItem.activityData.id));
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(timeline)
      })
    }
  }

  playVideo(post) {
    const { dispatch } = this.props
    const { details, paused = true } = post
    const { carInfoId, id } = details
    const action = paused ? playVideoAction : pauseVideoAction

    dispatch(action(carInfoId, id))
  }

  renderRow(post) {
    const { user, carOwner, comments, dispatch, likes = [] } = this.props;
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
        }

        } />
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