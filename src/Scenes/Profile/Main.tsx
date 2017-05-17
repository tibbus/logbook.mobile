import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { paramsToObj } from '../../Utils';

import { Info } from './Info';

const { width, height } = Dimensions.get("window");

export class Main extends Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        const { user, carCount, onCoverImageUpdate } = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.backdrop} source={{ uri: user.coverImg }}>
                    <View style={{flex: 1}} />
                    <TouchableOpacity onPress={() => this.onCameraClick(user.id, onCoverImageUpdate)}>
                        <Icon name='camera' style={styles.icon} />
                    </TouchableOpacity>
                </Image>
                <Info user={user} />
            </View>
        )
    }

    onCameraClick(userId, onCoverImageUpdate) {
    const options = { mediaType: 'photo' };
    const title = 'Photos';
    const titleLiveCapture = 'Take a photo...';
    const config = { ...options, title, chooseFromLibraryButtonTitle: 'Choose from Library...', takePhotoButtonTitle: titleLiveCapture }

    ImagePicker.showImagePicker(config, (response) => {

      const { didCancel, error, data, uri = '', origURL = '' } = response;

      if (didCancel) {
        console.log(response);
      }

      if (error) {
        console.log(response);
      }

      if (!origURL && !uri) {
        return;
      }

      const params: any = getParams(origURL, uri)

      if (!params) {
        throw new Error('Error: Invalid file.')
      }

      const contentData = {
        id: params.id,
        extension: params.ext,
        type:'image',
        uri: uri
      }

      onCoverImageUpdate(userId, contentData);
    })
  }
}

const getParams = (origURL, uri) => {
  if (origURL) {
    return paramsToObj(origURL)
  }

  // @TODO check how last keyword is working
  const ext = uri.split('.').pop();
  return {
    ext,
    id: 'anonymous',
    uri
  }
}

const coverPhotoHeight = 275;
const profilePictureHeight = 50;
const styles = StyleSheet.create({
    container: {
    },
    backdrop: {
        height: 250
    },
    icon: {
        fontSize: 25,
        fontWeight: '700',
        padding: 30,
        paddingBottom: 10,
        color: '#696969',
        alignSelf: 'flex-end'
    },
});
