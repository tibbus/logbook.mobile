import React, { Component } from 'react';
import {
  ListView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
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
export class Timeline extends Component {

  constructor () {
    super(...arguments)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const { car, dispatch, timelines = [], comments = [], likes = [] } = this.props;
    const { carInfo = {} } = car;
    const { user = {} } = this.props;
    this.carInfoId = carInfo.id;
    this.userId = user.id;

    const timeline = getTimeline(timelines, this.carInfoId);

    if (!timeline.length && this.carInfoId) {
      dispatch(setCarTimeline({ carInfoId: this.carInfoId }));
    }

    if(!likes.length && this.userId) {
      dispatch(getUserLikedPosts(this.userId));
    }

    this.state = {
      timeline,
      dataSource: ds.cloneWithRows(timeline)
    }
  }

  componentWillReceiveProps ({ car, timelines = [], likes = [] }) {
    //Commenting to prevent ddos :D
    /*if(likes !== this.props.likes) {
      const { dispatch } = this.props;
      dispatch(getUserLikedPosts(this.userId));
    }*/

    if (timelines !== this.props.timelines) {
      const { dispatch } = this.props;
      const timeline = getTimeline(timelines, this.carInfoId);
      
      timeline.forEach((timelineItem) => {
        dispatch(setTimelineComments(timelineItem.activityData.id));
        dispatch(getTimelineComments(timelineItem.activityData.id));
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(timeline)        
      })
    }
  }

  addStatus (config = {}) {
    const { dispatch, rootNav } = this.props
    const { mediaType } = config

    rootNav
      .push({
        id: 'modal',
        component: (
          <StatusCreate
            carInfoId={this.carInfoId}
            navigator={rootNav}
            dispatch={dispatch}
            mediaType={mediaType}
            style={styles.container} />
        )
      })
  }

  editStatus (statusId, mediaType = 'Status') {
    const { dispatch, rootNav, timelines } = this.props

    const status = getTimeline(timelines, this.carInfoId)
      .find(item => {
        const { type } = item

        if (type === mediaType && item.details.id === statusId) {
          return true
        }
        return false
      })

    if (!status) return false

    rootNav
      .push({
        id: 'modal',
        component: (
          <StatusEdit
            carInfoId={this.carInfoId}
            statusId={statusId}
            navigator={rootNav}
            style={styles.container}
            dispatch={dispatch}
            description={status.details.description} />
        )
      })
  }

  showStatusMenu (post) {
    const { details, type } = post
    const { id } = details
    const modal = {
      type: 'StatusMenu',
      id,
      mediaType: type
    }
    this.setState({ modal })
  }

  playVideo (post) {
    const { dispatch } = this.props
    const { details, paused = true } = post
    const { carInfoId, id } = details
    const action = paused ? playVideoAction : pauseVideoAction

    dispatch(action(carInfoId, id))
  }

  renderRow (post) {
    const { user, carOwner, comments, dispatch, likes = [] } = this.props;
    const { carInfoId }  = post.activityData;
    const likedItem = likes.find(element => element.postId === post.activityData.id);
    const liked = !!likedItem;
    const props = {
      ...post,
      onMenuPress: () => this.showStatusMenu(post),
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
    if(filteredComments) {
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
          dispatch(addComment(timelinePostId, userId, commentText))}

        } />
      </View>
    )
  }

  clearModal () {
    this.setState({
      modal: undefined
    })
  }

  statusAction ({ value }, id, mediaType) {
    const { dispatch } = this.props
    this.clearModal()

    switch (value) {
      case 'delete':
        return dispatch(deletePost(id, this.carInfoId, mediaType))

      default:
        return this.editStatus(id, mediaType)
    }
  }

  renderModalContent ({ type, id, mediaType } = {}) {
    switch (type) {
      case 'StatusMenu':
        return (
          <PostMenu
            onSelect={val => this.statusAction(val, id, mediaType)} />
        )

      default:
        return null
    }
  }

  render () {
    return (
      <LoadingView style={styles.container}
        isLoading={false}>
        <Modal transparent={Boolean(true)} visible={!!this.state.modal} animationType='fade'>
          <TouchableOpacity onPress={this.clearModal.bind(this)}
            style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center'}}>
            <View style={styles.modal}>
              {this.renderModalContent(this.state.modal)}
            </View>
          </TouchableOpacity>
        </Modal>
        <ListView
          contentContainerStyle={{ justifyContent: 'center' }}
          style={styles.container}
          dataSource={this.state.dataSource}
          enableEmptySections={Boolean(true)}
          //renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderRow.bind(this)} />
      </LoadingView>
    )
  }

  renderHeader () {
    const addPhoto = () => this.addStatus({ mediaType: 'image' })
    const addVideo = () => this.addStatus({ mediaType: 'video' })
    return (
      <StatusEntrySnapshot
        onAddStatus={this.addStatus.bind(this)}
        onAddPhoto={addPhoto}
        onAddVideo={addVideo} />
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
