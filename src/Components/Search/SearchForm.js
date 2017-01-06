import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export class SearchForm extends Component {

    constructor () {
        super(...arguments)
        this.state = {
            text: ''
        }
    }

    render() {
        const { onSubmit } = this.props
        return (
            <View style={styles.container}>
                <Text>Search</Text>
                <TextInput style={{height: 40, borderColor: 'gray', margin: 10, padding: 10, borderWidth: 1}}
                placeholder='Car Details'
                onChangeText={(text) => this.setState({text})}
                value={this.state.text} />
                <Icon.Button name='search' onPress={() => onSubmit(this.state.text)}>Search</Icon.Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})