import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NextButton } from '../../Components/Button';
import { GradientView } from '../../Components/Views';
import { paramsToObj } from '../../Utils';
import { FitImage } from '../../Components/FitImage/FitImage.component';
import ImagePicker from 'react-native-image-picker';

import textStyle from '../../Styles/text';
import palette from '../../Styles/Themes/palette';


const { width, height } = Dimensions.get("window");

export class CarProfileImage extends Component<any, any> {
    private contentData: any;
    constructor(props) {
        super(props)
        this.contentData = {};
        this.state = {
          uri:''
        }
    }

    render() {
        const { carInfoId, onProfileImageUpdate } = this.props;
        return (
        <GradientView>
            <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={{ marginTop: 40 }}>
                <Text style={textStyle.titleWhite}>Show off your car!</Text>
                </View>
                <Text style={textStyle.captionWhite}>'Upload a photo of your car to share with the world</Text>
            </View>
            <View style={styles.imageContainer}>
                {this.getCarProfileImagePreview(this.state.uri)}
            </View>
            </View>
            <View style={{ marginBottom: 20 }}>
            {NextButton(() => onProfileImageUpdate(carInfoId, this.contentData), 'Confirm')}
            </View>
          </GradientView>
        )
    }

    getCarProfileImagePreview = (uri) => {
        if(uri) {
            return (
                  <FitImage key={uri} source={{ uri: uri }} />
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.cameraButtonContainer} onPress={() => this.onCameraClick()}>
                  <View style={styles.cameraButtonSubContainer}>
                    <Icon name='camera' style={styles.icon} />
                    <Text>Add Car Photo</Text>
                  </View>
                </TouchableOpacity>
            )
        }
    }

    onCameraClick = () => {
      const options = { mediaType: 'photo' };
      const title = 'Photos';
      const titleLiveCapture = 'Take a photo...';
      const config: any = {
        ...options,
        title,
        chooseFromLibraryButtonTitle: 'Choose from Library...',
        takePhotoButtonTitle: titleLiveCapture,
        quality: 0.2
      };

      ImagePicker.showImagePicker(config, (response) => {
        const { didCancel, error, data, uri = '', origURL = '' } = response;

        if (!origURL && !uri) {
          return;
        } else if (didCancel) {
          console.log(response);
        } else if (error) {
          console.log(response);
        }

        const params: any = getParams(origURL, uri);

        if (!params) {
          throw new Error('Error: Invalid file.');
        }

        const contentData = {
          id: params.id,
          extension: params.ext,
          type: 'image',
          uri: uri
        };
        this.contentData = contentData;
        this.setState({uri});
      });
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

const paddingHorizontal = 30
const textInputHeight = 60
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "flex-start",
  },
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  },
  underline: {
    height: textInputHeight,
    width: width - (2 * paddingHorizontal),
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  textInput: {
    height: textInputHeight,
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  icon: {
    fontSize: 40,
    fontWeight: '200',
    color: 'rgba(105,105,105, 0.5)',
  },
  imageContainer: {
    flex:1, 
    width: width, 
    marginTop: 20
  },
  cameraButtonContainer: {
    flex: 1, 
    marginVertical: 20, 
    backgroundColor: 'rgba(255,255,255, 0.7)', 
    alignItems: 'center'
  },
  cameraButtonSubContainer: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center'
  }

})