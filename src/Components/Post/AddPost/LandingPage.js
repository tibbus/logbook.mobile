import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View,
  ListView
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import MediaPicker from 'react-native-image-picker'
import { FitImage }  from '../../Image'
import { paramsToObj } from '../../../Utils'
import { getTagsView } from './TagsView'
import { getGalleryView } from './GalleryView'
import { getStatusView } from './StatusView'
import { getCarSelectionView } from './CarSelectionView'

export class LandingPage extends Component {

  constructor (props) {
    super(props)
    this.addPost = {
            carInfoId: '',
            postType: '',
            description: '',
            tags: [],
            canAddContent: true,
            content: {
                contentType: '',
                data: []
            },
            car: {
              image: '',
              make: '',
              model: '',
              yearOfManufacture: ''
            }
        }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tagsDataSource: ds.cloneWithRows(this.addPost.tags),
      contentDataSource: ds.cloneWithRows(this.addPost.content.data)
    };
  }

  onSelectCar(id, value) {

    const tagsData = [value.make, value.model, value.yearOfManufacture];

    this.addPost.tags = tagsData;
    this.addPost.carInfoId = value.id;

    this.addPost.car.image = value.image;
    this.addPost.car.make = value.make;
    this.addPost.car.model = value.model;
    this.addPost.car.yearOfManufacture = value.yearOfManufacture;

    this.setState({
        tagsDataSource: this.state.tagsDataSource.cloneWithRows(this.addPost.tags)        
      });
    }

  showMenuBar() {
      return (
          <View style={styles.contentContainer}>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={() => this.onGalleryPress('image')}>
                <Text>Image</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={() => this.onGalleryPress('video')}>
                <Text>Video</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={() => onCameraPress()}>
                <Text>Camera</Text>
              </TouchableHighlight>
          </View>
      )
  }

  showNextButton(onNextClick) {
    const postDetails = this.addPost;
      return (
          <View style={styles.contentContainer}>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={() => onNextClick(postDetails)}>
                <Text>Next</Text>
              </TouchableHighlight>
          </View>
      )
  }

  onGalleryPress(type) {
    const opts = type === 'image' ? { mediaType: 'photo' } : { mediaType: 'video'};
    const title = type === 'image' ? 'Photos' : 'Videos'
    const config = { ...opts, title, chooseFromLibraryButtonTitle: 'Choose from Library...' }

    MediaPicker.launchImageLibrary(config, (response) => {
    
      const { didCancel, error, data, uri = '', origURL = ''} = response;
      
      if(didCancel) {
        console.log(response);
      }

      if(error) {
        console.log(response);
      }

      if(!origURL && !uri) {
        return;
      }
  
      const params = getParams(origURL, uri)

      if(!params) {
        throw new Error('Error: Invalid file.')
      }
      
      const contentData = {
          id: params.id,
          extension: params.ext,
          type: type === 'image' ? 'image' : 'video',
          uri: uri
      }

      this.addPost.postType = type === 'image' ? 'image' : 'video';
      this.addPost.content.contentType = type === 'image' ? 'image' : 'video';
      this.addPost.content.data.push(contentData);
      this.addPost.canAddContent = false;

      this.setState({
          contentDataSource: this.state.contentDataSource.cloneWithRows(this.addPost.content.data)        
      });
    })
  }

  onCameraPress() {
    MediaPicker.launchCamera(config, response => {
      const { didCancel, error, data, uri, origURL } = response;

      if(didCancel) {
        console.log(response);
      }

      if(error) {
        console.log(response);
      }

      const params = getParams(origURL, uri)
      
      if(!params) {
        throw new Error('Error: Invalid file.')
      }

      console.log(response);
    })
  }

  render () {
      const { navigator, rootNav, cars, onNextClick } = this.props;

      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerButtonContainer}>
              <TouchableHighlight style={styles.headerButton} onPress={() => rootNav.pop()}>
                  <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.headerHeadingTextt}>ADD POST</Text>
            </View>
          </View>
            {getCarSelectionView(true, getCarOptions(cars.userCars), (id, value) => this.onSelectCar(id, value), this.addPost.car)}
            {getStatusView(true, (text) => {this.addPost.description = text}, "")}
          <View style={{flex:1, borderBottomWidth: 2, borderBottomColor: '#000000'}}>
          </View>
            {getTagsView(this.state.tagsDataSource)}            
            {getGalleryView(this.state.contentDataSource, () => this.onGalleryPress(this.addPost.postType))}
            {
                this.addPost.canAddContent ? this.showMenuBar() : this.showNextButton(onNextClick)
            }
        </View>
      )
  }
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

const getCarOptions = (cars) => {
    const carOptions = cars.map((car) => {
        const carDetails = {id: car.carInfo.id, model: car.carInfo.car.model, make: car.carInfo.car.make, yearOfManufacture: car.carInfo.car.yearOfManufacture, image: car.carInfo.image}
        return carDetails;
    });

    return carOptions;
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  }
})