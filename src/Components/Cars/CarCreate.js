import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import { BackScene } from '../Scenes'
import { CarForm } from './'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d0d0d0',
    flex: 1
  }
})

export class CarCreate extends Component {

  back () {
    const { navigator } = this.props
    navigator.pop()
  }

  render () {
    const { onAction } = this.props
    return (
      <BackScene onBack={this.back.bind(this)} style={styles.container}>
        <CarForm onSubmit={onAction} />
      </BackScene>
    )
  }

}
