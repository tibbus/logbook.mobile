import React, {
  Component,
  ListView,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CommentsSnapshot, CommentCreate } from './Comments'
import { EventEntrySnapshot } from './EventEntry'
import { getEvent } from './Events'

const stateToProps = ({ timelines }) => ({ timelines })

@connect(stateToProps)
export class Home extends Component {

  constructor () {
    super(...arguments)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { timelines = [] } = this.props
    this.state = {
      timelines,
      dataSource: ds.cloneWithRows(timelines)
    }
  }

  addTimeline () {
    const { parentNav } = this.props

    parentNav
      .push({
        id: 'modal',
        component: (
          <CommentCreate />
        )
      })
  }

  renderEmpty () {
    return (
      <View style={styles.container}>
        <Icon.Button name='plus' onPress={this.addTimeline.bind(this)}>
          Add a timeline
        </Icon.Button>
      </View>
    )
  }

  componentWillReceiveProps ({ timelines }) {
    if (timelines !== this.props.timelines) {
      this.setState({
        timelines,
        dataSource: this.state.dataSource.cloneWithRows(timelines)
      })
    }
  }

  addComment () {
    const { parentNav } = this.props

    parentNav
      .push({
        id: 'modal',
        component: (
          <CommentCreate navigator={parentNav} style={styles.container} />
        )
      })
  }

  renderRow (data) {
    const { comments } = data
    return (
      <View style={styles.row}>
        {getEvent(data)}
        <CommentsSnapshot
          style={styles.commentsSnapshot}
          onPress={this.addComment.bind(this)}
          comments={comments} />
      </View>
    )
  }

  renderTimeline () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={{ justifyContent: 'center' }}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderHeader={() => <EventEntrySnapshot />}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }

  render () {
    const { timelines } = this.props

    if (timelines.length) {
      return this.renderTimeline()
    } else {
      return this.renderEmpty()
    }
  }
}

const styles = StyleSheet.create({
  commentsSnapshot: {
    flex: 1,
    backgroundColor: '#efefef'
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
