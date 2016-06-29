import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import { BackScene } from '../Scenes'
import { CommentInput } from './'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d0d0d0',
    flex: 1
  }
})

export class CommentCreate extends Component {

  back () {
    const { navigator } = this.props
    navigator.pop()
  }

  render () {
    return (
      <BackScene onBack={this.back.bind(this)} style={styles.container}>
        <CommentInput />
      </BackScene>
    )
  }

}
