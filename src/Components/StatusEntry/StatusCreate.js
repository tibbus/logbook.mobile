import React, { Component } from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'
import { BackScene } from '../Scenes'
import { StatusEntry } from './'
import {
  addCarTimelineImage,
  addCarTimelineStatus,
  addCarTimelineVideo } from '../../Actions/timeline'
import MediaPicker from 'react-native-image-picker'
import { paramsToObj } from '../../Utils'
import { last } from 'ramda'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d0d0d0',
    flex: 1
  }
})

const pickMedia = (opts = {}) => {
  const { mediaType } = opts
  const title = mediaType === 'video' ? 'Videos' : 'Photos'
  const config = { ...opts, title, chooseFromLibraryButtonTitle: 'Choose from Library...' }

  return new Promise((resolve, reject) => {
    MediaPicker.launchImageLibrary(config, response => {
      const { didCancel } = response
      if (didCancel) {
        return reject()
      }

      return resolve(response)
    })
  })
}

const getParams = (origURL, uri) => {
  if (origURL) {
    return paramsToObj(origURL)
  }

  const ext = last(uri.split('.'))
  return {
    ext,
    id: 'anonymous',
    uri
  }
}

export class StatusCreate extends Component {

  constructor () {
    super(...arguments)
    this.title = 'Post a status'
    this.actionName = 'Post'
    this.state = {}

    const { mediaType = null } = this.props

    if (mediaType) {
      pickMedia({ mediaType })
        .then((media, f2) => {
          const { origURL = '', uri = '' } = media
          const params = getParams(origURL, uri)

          if (!params) {
            throw new Error('Error: Invalid file')
          }

          this.setState({
            [mediaType]: {
              uri,
              ...params
            }
          })
          this.postType = mediaType
        })
        // TODO handle picker error
        .catch(console.error)
    }
  }

  back () {
    const { navigator } = this.props
    navigator.pop()
  }

  onAction () {
    this.doStatusAction()
    this.back()
  }

  setStatusDescription (text) {
    this.description = text
  }

  getAction () {
    const { carInfoId } = this.props
    const { description, postType } = this
    const { image, video } = this.state

    switch (postType) {

      case 'image':
        return addCarTimelineImage({
          carInfoId,
          description,
          image
        })

      case 'video':
        return addCarTimelineVideo({
          carInfoId,
          description,
          video
        })

      default:
        return addCarTimelineStatus({
          carInfoId,
          description
        })
    }
  }

  doStatusAction () {
    const { dispatch } = this.props
    dispatch(this.getAction())
  }

  render () {
    const { description = '' } = this.props
    const { image } = this.state

    return (
      <BackScene
        onAction={() => this.onAction()}
        onBack={this.back.bind(this)}
        actionName={this.actionName}
        title={this.title}
        style={styles.container}>
        <StatusEntry
          value={description}
          onChangeText={this.setStatusDescription.bind(this)} />
          {image ? (<Image source={{uri: image.uri}} style={{flex: 3}} resizeMode='contain' />) : null}

      </BackScene>
    )
  }

}
