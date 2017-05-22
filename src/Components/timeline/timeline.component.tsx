import React, { Component } from 'react';
import {
  ListView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from '../../Utils/connect';
import { dispatch } from '../../store';

import { pauseVideoAction, playVideoAction, setTimeline } from '../../Actions/timeline';
import { deletePost } from '../../Actions/post';
import { addComment, setTimelineComments, getTimelineComments } from '../../Actions/comments';
import { getUserLikedPosts, likePost, unlikeTimelinePost } from '../../Actions/like';
import { LoadingView } from '../../Components/LoadingView';
import { Post } from '../../Components/Post/Post';
import { PostMenu } from '../../Components/Post/PostMenu';
import { Comments } from '../../Components/Comments/Comments.component';
import { CommentInput } from '../../Components/Comments/CommentInput.component';
import { styles } from './timeline.styles';

const getTimeline = (timelines, type, id) => {
  const timelineDetails = timelines.find(({ actorType, actorId }) => actorType === type && actorId === id);

  return timelineDetails ? timelineDetails.timeline : [];
};

const stateToProps = ({ timelines, comments, likes }) => ({ timelines, comments, likes });

@connect(stateToProps)
export class Timeline extends Component<any, any> {
  private carInfoId: string;
  private userId: string;
  private commentsRequested: boolean = false;

  constructor(props) {
    super(props);

    // @todo rowHasChanged is ignored because comments are NOT bound to timeline
    // If the comments will change the row will NOT, but the comments are rendered inside renderRow
    // this logic should be changed somehow
    // Redux NOTES (bound means action will trigger a timeline CHANGE (r1 !== r2)):
    // Likes:         NOT bound to timeline
    // LikesCount:    bound to timeline
    // Comments:      NOT bound to timeline
    // CommentsCount: NOT bound to timeline
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => true });
    const { type, car, dispatch, timelines = [], comments = [], likes = [], requestPending } = this.props;
    const { user = {} }: { user: any } = this.props;

    this.userId = user.id;
    let timeline = [];

    if (type === 'car') {
      this.carInfoId = this.props.car.carInfo.id;
      timeline = getTimeline(timelines, type, this.carInfoId);

      if (!timeline.length && this.carInfoId && !requestPending) {
        dispatch(setTimeline(type, this.carInfoId));
      }
    } else if (type === 'user') {
      timeline = getTimeline(timelines, type, this.userId);

      if (!timeline.length && this.userId) {
        dispatch(setTimeline(type, this.userId));
      }
    }

    if (!likes.length && this.userId) {
      dispatch(getUserLikedPosts(this.userId));
    }

    this.state = {
      timeline,
      dataSource: ds.cloneWithRows(timeline)
    }
  }

  componentWillReceiveProps({ car, timelines = [], comments }) {
    // @todo review how the logic works here with redux : update timelines/likes/comments
    // We are not interested in likes CHANGE because timeline listen to likes
    // but the timeline does NOT listen to comments CHANGE
    if (timelines !== this.props.timelines || comments !== this.props.comments) {
      console.log('CALLED CALLED CALLED CALLED CALLED')
      const { type } = this.props;
      let timeline = [];

      if (type === 'car') {
        timeline = getTimeline(timelines, type, this.carInfoId);
      } else {
        timeline = getTimeline(timelines, type, this.userId);
      }

      // @todo This should be moved to a SAGA side effect
      if (!this.commentsRequested) {
        this.commentsRequested = true;
        timeline.forEach((timelineItem) => {
          dispatch(setTimelineComments(timelineItem.activityData.id));
          dispatch(getTimelineComments(timelineItem.activityData.id));
        });
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(timeline)
      });
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
    const { type, user, carOwner, comments, dispatch, likes = [] } = this.props;
    const { carInfoId } = post.activityData;
    const likedItem = likes.find(element => element.postId === post.activityData.id);
    const liked = !!likedItem;
    const props = {
      ...post,
      // @TODO showStatusMenu not defined ??
      //onMenuPress: () => this.showStatusMenu(post),
      onVideoPress: this.playVideo.bind(this),
      onLikePress: () => dispatch(likePost(post.activityData.id, user.id, carInfoId, type)),
      onUnlikePress: () => dispatch(unlikeTimelinePost(likedItem.id, likedItem.postId, user.id, carInfoId, type)),
      carOwner,
      user,
      liked
    };

    const filteredComments = comments.find((timelinePostComments) => {
      return timelinePostComments.timelinePostId === post.activityData.id
    });

    let postComments = [];
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
        {Post(props)}
        <Comments comments={postComments} />
        <CommentInput props={props} onSubmitEditing={(timelinePostId, userId, commentText) => {
          dispatch(addComment(timelinePostId, userId, commentText))
        }} />
      </View>
    );
  }

  render() {
    return (
      <LoadingView isLoading={false}>
        <ListView
          contentContainerStyle={{ justifyContent: 'center' }}
          scrollEnabled={false}
          dataSource={this.state.dataSource}
          enableEmptySections={Boolean(true)}
          renderRow={this.renderRow.bind(this)} />
      </LoadingView>
    );
  }
}
