import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const stateToProps = ({ user }) => ({ user })
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

@connect(stateToProps)
export class EventEntrySnapshot extends Component {

  render () {
    const { user } = this.props
    const { profileImg } = user

    return (
      <View>
        <View style={styles.container}>
          <Image
            source={{uri: profileImg}}
            style={styles.profileImg} />
          <Text style={styles.textInput}>Add an event...</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.button}><Icon name='plus'>Photo</Icon></View>
          <View style={styles.button}><Icon name='plus'>Photo</Icon></View>
        </View>
      </View>
    )
  }
}
