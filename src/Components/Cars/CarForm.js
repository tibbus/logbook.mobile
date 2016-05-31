import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export class CarForm extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      text: ''
    }
  }

  render () {
    const { onSubmit } = this.props
    return (
      <View style={styles.container}>
        <Text>Car Registration</Text>
        <TextInput style={{height: 40, borderColor: 'gray', margin: 10, padding: 10, borderWidth: 1}}
          placeholder='Car Registration'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text} />
        <Icon.Button name='plus' onPress={() => onSubmit(this.state.text)}>Add</Icon.Button>
      </View>
    )
  }
}
