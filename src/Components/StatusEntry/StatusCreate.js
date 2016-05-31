import React, {
  Component,
  StyleSheet
} from 'react-native'
import { BackScene } from '../Scenes'
import { StatusEntry } from './'
import { addCarTimelineStatus } from '../../Actions/timeline'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d0d0d0',
    flex: 1
  }
})

export class StatusCreate extends Component {

  constructor () {
    super(...arguments)
    this.title = 'Post a status'
    this.actionName = 'Post'
  }

  back () {
    const { navigator } = this.props
    navigator.pop()
  }

  onAction () {
    this.doStatusAction(this.description)
    this.back()
  }

  setStatusDescription (text) {
    this.description = text
  }

  doStatusAction (description) {
    const { carInfoId, dispatch } = this.props
    dispatch(addCarTimelineStatus({
      carInfoId,
      description
    }))
  }

  render () {
    const { description = '' } = this.props
    return (
      <BackScene
        onAction={() => this.onAction()}
        onBack={this.back.bind(this)}
        actionName={this.actionName}
        title={this.title}
        style={styles.container}>
        <StatusEntry
          value={description}
          onChangeText={this.setStatusDescription.bind(this)} />
      </BackScene>
    )
  }

}
