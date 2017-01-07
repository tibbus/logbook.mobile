import React, { Component } from 'react'
import {
  ListView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import {
  pauseVideoAction,
  playVideoAction,
  setCarTimeline
} from '../../Actions/timeline'
import { deletePost } from '../../Actions/post'
import { LoadingView } from '../LoadingView'
import { CommentsSnapshot, CommentCreate } from '../Comments'
import { StatusCreate, StatusEdit, StatusEntrySnapshot } from '../StatusEntry'
import { getPost, PostMenu } from '../Post'
import colours from '../../Utils/colours'

const getTimeline = (timelines, carInfoIdArg) => {
  const timelineDetails = timelines.find(({ carInfoId }) => carInfoId === carInfoIdArg)
  return timelineDetails ? timelineDetails.timeline : []
}
const stateToProps = ({ timelines }) => ({ timelines })

@connect(stateToProps)
export class Timeline extends Component {

  constructor () {
    super(...arguments)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { car, dispatch, timelines = [] } = this.props
    const { carInfo = {} } = car
    this.carInfoId = carInfo.id

    const timeline = getTimeline(timelines, this.carInfoId)

    if (!timeline.length && this.carInfoId) {
      dispatch(setCarTimeline({ carInfoId: this.carInfoId }))
    }

    this.state = {
      timeline,
      dataSource: ds.cloneWithRows(timeline)
    }
  }

  componentWillReceiveProps ({ car, timelines = [] }) {
    if (timelines !== this.props.timelines) {
      const timeline = getTimeline(timelines, this.carInfoId)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(timeline)
      })
    }
  }

  addComment () {
    const { rootNav } = this.props

    rootNav
      .push({
        id: 'modal',
        component: (
          <CommentCreate navigator={rootNav} style={styles.container} />
        )
      })
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
    const { user } = this.props

    const props = {
      ...post,
      onMenuPress: () => this.showStatusMenu(post),
      onVideoPress: this.playVideo.bind(this),
      user
    }
    const comments = []

    return (
      <View style={styles.row}>
        {getPost(props)}
        <CommentsSnapshot
          style={styles.commentsSnapshot}
          onPress={this.addComment.bind(this)}
          comments={comments} />
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
          renderHeader={this.renderHeader.bind(this)}
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
    flex: 1,
    //marginLeft: 5,
    //marginRight: 5,
    backgroundColor: colours.backgroundBlue,
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
