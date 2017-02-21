import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import MediaPicker from 'react-native-image-picker'

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


const onGalleryPress = (mediaType) => {
  const opts = { mediaType };
  const title = mediaType === 'video' ? 'Videos' : 'Photos'
  const config = { ...opts, title, chooseFromLibraryButtonTitle: 'Choose from Library...' }

  
  MediaPicker.launchImageLibrary(config, (response) => {

    console.log('Response : ', response);
    
    const { didCancel, error, data, uri, origURL, uri } = response;
    
    if(didCancel) {
      console.log(response);
    }

    if(error) {
      console.log(response);
    }

    console.log(response);

  })
}

const onCameraPress = () => {
  MediaPicker.launchCamera(config, response => {
    const { didCancel, error, data, uri, origURL, uri } = response;

    if(didCancel) {
      console.log(response);
    }

    if(error) {
      console.log(response);
    }

    console.log(response);
  })
}

const onCancelPress = (navigator) => {
  navigator.pop()
}

export class AddPost extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render () {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableHighlight style={styles.headerButton} onPress={() => onCancelPress(navigator)}>
                <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.headerHeadingContainer}>
            <Text style={styles.headerHeadingTextt}>ADD POST</Text>
          </View>
        </View>
        <View style={styles.carSelectorContainer}>
            <ModalDropdown options={['image car 1', 'image car 2']} />
        </View>
        <View style={styles.contentDescriptionContainer}>
          <Image source={{uri: 'https://maxcdn.icons8.com/iOS7/PNG/75/Users/user_male_circle_filled-75.png'}} style={styles.icon} />
          <TextInput placeholder="What's new with car term today? Feeling like: Cruising? Thing? Or something?" returnKeyType='done' multiline={true} style={{flex:1, marginTop: 20, paddingVertical: 10, borderWidth: 1, borderColor: '#000000'}}/>
        </View>
        <View style={{flex:1, borderBottomWidth: 2, borderBottomColor: '#000000'}}>
        </View>
        <View style={styles.tagsContainer}>
            <Text>Tags</Text>
            <Text>Car Make</Text>
            <Text>Car Model</Text>
            <Text>Car Year</Text>
        </View>
        <View style={styles.contentContainer}>
            <TouchableHighlight onPress={() => onGalleryPress('image')}>
              <Text>Image</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => onGalleryPress('video')}>
              <Text>Video</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => onCameraPress()}>
              <Text>Camera</Text>
            </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 10
  },
  headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {

  },
  headerHeadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50
  },
  headerHeadingText: {

  },
  carSelectorContainer: {
    flex: 1,
    paddingHorizontal: 10
    
  },
  contentDescriptionContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',

  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
})