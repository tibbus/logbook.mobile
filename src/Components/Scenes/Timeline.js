import React, {
  Component,
  ListView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { setCarTimeline } from '../../Actions/timeline'
import { deleteStatus } from '../../Actions/status'
import { LoadingView } from '../LoadingView'
import { CommentsSnapshot, CommentCreate } from '../Comments'
import { StatusCreate, StatusEdit, StatusEntrySnapshot } from '../StatusEntry'
import { getStatus, StatusMenu } from '../Statuses'

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

  addStatus () {
    const { dispatch, rootNav } = this.props

    rootNav
      .push({
        id: 'modal',
        component: (
          <StatusCreate
            carInfoId={this.carInfoId}
            navigator={rootNav}
            dispatch={dispatch}
            style={styles.container} />
        )
      })
  }

  editStatus (statusId) {
    const { dispatch, rootNav, timelines } = this.props
    console.info(statusId)
    const status = getTimeline(timelines, this.carInfoId)
      .find(item => {
        const { type } = item
        console.info(type)
        if (type === 'Status' && item.details.id === statusId) {
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

  showStatusMenu (details) {
    const { id } = details

    this.setState({
      modal: {
        type: 'StatusMenu',
        id
      }
    })
  }

  renderRow (data) {
    const props = {
      ...data,
      onMenuPress: this.showStatusMenu.bind(this)
    }
    const comments = []
    return (
      <View style={styles.row}>
        {getStatus(props)}
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

  statusAction ({ value }, id) {
    const { dispatch } = this.props
    this.clearModal()
    switch (value) {
      case 'delete':
        return dispatch(deleteStatus(id, this.carInfoId))

      default:
        return this.editStatus(id)
    }
  }

  renderModalContent ({ type, id } = {}) {
    switch (type) {
      case 'StatusMenu':
        return (
          <StatusMenu onSelect={val => this.statusAction(val, id)} />
        )

      default:
        return null
    }
  }

  render () {
    return (
      <LoadingView style={styles.container}
        isLoading={false}>
        <Modal transparent={Boolean(true)} visible={!!this.state.modal} animationType='slide'>
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
          renderHeader={() => <StatusEntrySnapshot onAddStatus={this.addStatus.bind(this)} />}
          renderRow={this.renderRow.bind(this)} />
      </LoadingView>
    )
  }
}

const styles = StyleSheet.create({
  commentsSnapshot: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  modal: {
    padding: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2'
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
    marginTop: 15
  }
})
