import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View,
  ListView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import { paramsToObj } from '../../Utils';
import { getTagsView } from './TagsView';
import { getGalleryView } from './GalleryView';
import { getStatusView } from './StatusView';
import { getCarSelectionView } from './CarSelectionView';
import { IconButton } from '../../Components/Button';
import background from '../../Styles/Themes/background';
import palette from '../../Styles/Themes/palette';

export class LandingPage extends Component<any, any> {
  private addPost: any;

  constructor(props) {
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

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      tagsDataSource: ds.cloneWithRows(this.addPost.tags),
      contentDataSource: ds.cloneWithRows(this.addPost.content.data)
    };
  }

  componentDidMount() {
    
    if(this.props.cars.userCars.length > 0) {
      const cars = getCarOptions(this.props.cars.userCars);
      const { id } = cars[0]
      this.onSelectCar(id, cars[0])
    }
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
        {IconButton(() => this.onGalleryPress('video'), 'video-camera')}
        {IconButton(() => this.onGalleryPress('image'), 'picture-o')}
      </View>
    )
  }

  showPostButton(onPostClick) {
    return (
      <View style={styles.contentContainer}>
        <TouchableHighlight style={styles.postActionButton} onPress={() => onPostClick()}>
          <View style={styles.postActionButtonContainer}>
            <Text style={styles.postActionButtonText}>Post</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  onGalleryPress(type) {
    const options = type === 'image' ? { mediaType: 'photo' } : { mediaType: 'video' };
    const title = type === 'image' ? 'Photos' : 'Videos'
    const titleLiveCapture = type === 'image' ? 'Take a photo...' : 'Take a video...'
    const config: any = { ...options, title, chooseFromLibraryButtonTitle: 'Choose from Library...', takePhotoButtonTitle: titleLiveCapture }

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

  render() {
    const { navigator, rootNav, cars, onPostClick, user } = this.props;

    if(cars.userCars.length < 1) {
       return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerButtonContainer}>
              <TouchableHighlight onPress={() => rootNav.pop()}>
                <Text style={styles.cancelButton}>Back</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.headerHeadingText}>ADD POST</Text>
            </View>
            <View style={styles.headerButtonContainer}>
            </View>
          </View>
          <View style={styles.emptyGarageTextView}>
            <Text style={styles.emptyGarageText}>Your garage is empty. Please add a car to your garage before adding a post.</Text>
          </View>
        </View>
      )
    }
    else {

      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerButtonContainer}>
              <TouchableHighlight onPress={() => rootNav.pop()}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.headerHeadingContainer}>
              <Text style={styles.headerHeadingText}>ADD POST</Text>
            </View>
            <View style={styles.headerButtonContainer}>
              <TouchableHighlight onPress={() => validateInput(this.addPost, () => onPostClick(this.addPost), () => Alert.alert("Failed!", "The post cannot be empty."))}>
                  <Text style={styles.postButton}>Post</Text>
              </TouchableHighlight>
            </View>
          </View>
          {getCarSelectionView(true, getCarOptions(cars.userCars), (id, value) => this.onSelectCar(id, value), this.addPost.car)}
          {getStatusView(true, (text) => { this.addPost.description = text }, "", user.profileImg)}
          <View style={styles.tagsView}>
            {getTagsView(this.state.tagsDataSource)}
          </View>
          <View style={styles.emptyContainer}>
            {getGalleryView(this.state.contentDataSource, () => this.onGalleryPress(this.addPost.postType))}
            {
              this.addPost.canAddContent ? this.showMenuBar() : null
            }
          </View>
        </View>
      )
    }
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

const getCarOptions = (cars) => {
  const carOptions = cars.map((car) => {
    return {
      id: car.carInfo.id,
      model: car.carInfo.car.model,
      make: car.carInfo.car.make,
      yearOfManufacture: car.carInfo.car.yearOfManufacture,
      image: car.carInfo.image
    }
  });

  return carOptions;
}

const validateInput = (postDetails, onSuccess, onFailure) => {

  let valid = true;

  if(!postDetails.carInfoId) {
    valid = false;
  }

  if(!postDetails.description) {
    valid = false;
  }

  if(valid) {
    onSuccess();
  }
  else {
    onFailure();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 2,
    backgroundColor: background.color,
  },
  tagsView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: background.secondary,
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerHeadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center', 
    marginTop: 5,
    backgroundColor: background.color,
  },
  postButton: {
    fontWeight: "600",
    color: palette.primary
  },
  cancelButton: {
    color: palette.primaryCancel
  },
  headerHeadingText: {
  },
  nextButtonText: {
    flex: 1,
    fontSize: 20,
    color: palette.secondary
  },
  postActionButton: {
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: palette.primary,
    justifyContent: "space-around",
    height: 30,
    //marginHorizontal: 10
  },
  postActionButtonText: {
    flex: 1,
    fontSize: 20,
    color: 'white'
  },
  postActionButtonContainer: {
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  emptyGarageTextView: {
    flex: 5,
    flexDirection: 'row',
  },
  emptyGarageText: {
    flex:1,
    flexDirection:'row'
  }
})