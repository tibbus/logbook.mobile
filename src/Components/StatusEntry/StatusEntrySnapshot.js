import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const stateToProps = ({ user }) => ({ user })

@connect(stateToProps)
export class StatusEntrySnapshot extends Component {

  render () {
    const { user, onAddStatus } = this.props
    const { profileImg } = user

    return (
      <View>
        <TouchableHighlight onPress={() => onAddStatus()}>
          <View style={styles.container}>
            <Image
              source={{uri: profileImg}}
              style={styles.profileImg} />
            <Text style={styles.textInput}>Add a status...</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.button}><Icon name='pencil'> Event</Icon></View>
          <View style={styles.button}><Icon name='camera'> Photo</Icon></View>
          <View style={styles.button}><Icon name='film'> Video</Icon></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileImg: {
    height: 50,
    width: 50
  },
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding: 10
  },
  textInput: {
    color: '#666'
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
