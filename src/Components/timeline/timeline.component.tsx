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
import { getPost, PostMenu } from '../../Components/Post';
import { Comments, CommentInput } from '../../Components/Comments';
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

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const { type, car, dispatch, timelines = [], comments = [], likes = [] } = this.props;
    const { user = {} }: { user: any } = this.props;

    this.userId = user.id;
    let timeline;

    if (type === 'car') {
      this.carInfoId = this.props.car.carInfo.id;
      timeline = getTimeline(timelines, type, this.carInfoId);

      if (!timeline.length && this.carInfoId) {
        dispatch(setTimeline(type, this.carInfoId));
      }
    } else {
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

  componentWillReceiveProps({ car, timelines = [], likes = [] }) {
    //Commenting to prevent ddos :D
    /*if(likes !== this.props.likes) {
      const { dispatch } = this.props;
      dispatch(getUserLikedPosts(this.userId));
    }*/

    if (timelines !== this.props.timelines) {
      const { type } = this.props;
      let timeline;

      if (type === 'car') {
        timeline = getTimeline(timelines, type, this.carInfoId);
      } else {
        timeline = getTimeline(timelines, type, this.userId);
      }

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
      user,
      liked
    }

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
        {getPost(props)}
        <Comments comments={postComments} />
        <CommentInput props={props} onSubmitEditing={(timelinePostId, userId, commentText) => {
          dispatch(addComment(timelinePostId, userId, commentText))
        }

        } />
      </View>
    );
  }

  render() {
    return (
      <LoadingView style={styles.container}
        isLoading={false}>
        <ListView
          contentContainerStyle={{ justifyContent: 'center' }}
          scrollEnabled={false}
          style={styles.container}
          dataSource={this.state.dataSource}
          enableEmptySections={Boolean(true)}
          renderRow={this.renderRow.bind(this)} />
      </LoadingView>
    );
  }
}
