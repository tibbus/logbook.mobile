import React, {
  Component,
  ListView,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CommentsSnapshot, CommentCreate } from '../Comments'
import { StatusEntrySnapshot } from '../StatusEntry'
import { getStatus } from '../Statuses'

const stateToProps = ({ cars }) => ({ cars })

@connect(stateToProps)
export class Home extends Component {

  constructor () {
    super(...arguments)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { cars = [] } = this.props
    this.state = {
      cars,
      dataSource: ds.cloneWithRows(cars)
    }
  }

  addCar () {
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
        <Icon.Button name='plus' onPress={this.addCar.bind(this)}>
          Add a car
        </Icon.Button>
      </View>
    )
  }

  componentWillReceiveProps ({ cars }) {
    if (cars !== this.props.cars) {
      this.setState({
        cars,
        dataSource: this.state.dataSource.cloneWithRows(cars)
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
        {getStatus(data)}
        <CommentsSnapshot
          style={styles.commentsSnapshot}
          onPress={this.addComment.bind(this)}
          comments={comments} />
      </View>
    )
  }

  renderCar () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={{ justifyContent: 'center' }}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderHeader={() => <StatusEntrySnapshot />}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }

  render () {
    const { cars } = this.props

    if (cars.length) {
      return this.renderCar()
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
