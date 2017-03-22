import React, { Component } from 'react'
import {
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
  } as React.ViewStyle
})

export class RegNoForm extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render () {
    const { carRegSubmit } = this.props
    return (
      <View style={styles.container}>
        <Text>Add your car to your garage</Text>
        <Text>Enter your Vehical Registration No.</Text>
        <TextInput style={{height: 40, borderColor: 'gray', margin: 10, padding: 10, borderWidth: 1}}
          placeholder='Car Registration'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text} />
        <Icon.Button name='plus' onPress={() => carRegSubmit(this.state.text)}>Next</Icon.Button>
      </View>
    )
  }
}
