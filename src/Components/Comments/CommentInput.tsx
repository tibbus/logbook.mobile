import React, {Component} from 'react'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#e0e0e0',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    backgroundColor: '#f0f0f0'
  }
})

export class CommentInput extends Component {

  constructor (props) {
    super(props);
    this.state = { text: ''}
  }

  render() {
    const {props, onSubmitEditing} = this.props;
    return (
      <View style={styles.container}>
        <TextInput placeholder='Add your comment here!' style={styles.input}
          returnKeyType='done'
          blurOnSubmit={true}
          onChangeText={ (text) => this.setState({text}) }
          value = {this.state.text}
          onSubmitEditing={(event) => {
            onSubmitEditing(props.activityData.id, props.user.id, event.nativeEvent.text)
            this.setState({text: ''})
            }
          }
          />
        </View>
      )
    }
}