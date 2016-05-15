import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export class TimelineForm extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      text: ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Timeline</Text>
        <TextInput style={{height: 40, borderColor: 'gray', margin: 10, padding: 10, borderWidth: 1}}
          placeholder='Car Registration'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text} />
      </View>
    )
  }
}
