import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export class Success extends Component {

  constructor (props) {
    super(props)
  }

  render () {
      const { completeProfile, viewProfile } = this.props;
      return (
          <View>
            <Text>Success</Text>
            <Icon name='check-circle-o' style={{fontSize:15, color:'green'}} />
            <TouchableHighlight onPress={() => console.log('complete')}>
                    <Text>Complete Profile  ></Text>
            </TouchableHighlight>
             <TouchableHighlight onPress={() => console.log('view profile')}>
                    <Text>View Profile  ></Text>
            </TouchableHighlight>
          </View>

      )
  }
}