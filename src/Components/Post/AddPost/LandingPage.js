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
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'
import MediaPicker from 'react-native-image-picker'
import { FitImage }  from '../../Image'
import { paramsToObj } from '../../../Utils'

export class LandingPage extends Component {

  constructor (props) {
    super(props)
    this.addPost = {
            carInfoId: '',
            description: '',
            tags: [],
            canAddContent: true,
            content: {
                contentType: '',
                data: []
            }
        }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tagsDataSource: ds.cloneWithRows(this.addPost.tags),
      contentDataSource: ds.cloneWithRows(this.addPost.content.data)
    };
  }

  onSelectCar(id, value) {
    const tagsData = [value.model, value.make, value.yearOfManufacture];
    this.addPost.tags = tagsData;
    this.addPost.carInfoId = value.id;
    this.setState({
        tagsDataSource: this.state.tagsDataSource.cloneWithRows(this.addPost.tags)        
      });
    }
    
  updateDescription(text) {
      this.addPost.description += text;
  }

  renderCarOptionRow (rowData) {
      return (
          <View style={{flex: 1, flexDirection: 'row', width:250, height:20}}>
              <Image source={{ uri: rowData.image}} style={styles.photo} />
              <Text style={{fontSize: 10}}>{rowData.model} {rowData.make} {rowData.yearOfManufacture}</Text>
          </View>
      )
  }

  showMenuBar() {
      return (
          <View style={styles.contentContainer}>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={this.onImageGalleryPress.bind(this)}>
                <Text>Image</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={this.onVideoGalleryPress.bind(this)}>
                <Text>Video</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={() => onCameraPress()}>
                <Text>Camera</Text>
              </TouchableHighlight>
          </View>
      )
  }

  showNextButton(onPostClick) {
    const postDetails = this.addPost;
      return (
          <View style={styles.contentContainer}>
              <TouchableHighlight style={{flex:1, alignItems: 'center', paddingHorizontal: 10}} onPress={() => onPostClick(postDetails)}>
                <Text>Next</Text>
              </TouchableHighlight>
          </View>
      )
  }

  onImageGalleryPress() {
    const opts = { mediaType: 'photo' }
    const title = 'Photos'
    const config = { ...opts, title, chooseFromLibraryButtonTitle: 'Choose from Library...' }

    MediaPicker.launchImageLibrary(config, (response) => {
    
      const { didCancel, error, data, uri = '', origURL = ''} = response;
      
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
      
      const contentData = {
          id: params.id,
          extension: params.ext,
          type: 'image',
          uri: uri
      }

      this.addPost.content.contentType = 'image';
      this.addPost.content.data.push(contentData);
      this.addPost.canAddContent = false;

      this.setState({
          contentDataSource: this.state.contentDataSource.cloneWithRows(this.addPost.content.data)        
      });
    })
  }

  onVideoGalleryPress() {
    const opts = { mediaType: 'video' }
    const title = 'Videos'
    const config = { ...opts, title, chooseFromLibraryButtonTitle: 'Choose from Library...' }

    MediaPicker.launchImageLibrary(config, (response) => {
    
      const { didCancel, error, data, uri = '', origURL = ''} = response;
      
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
      
      const contentData = {
          id: params.id,
          extension: params.ext,
          type: 'image',
          uri: uri
      }

      this.addPost.content.contentType = 'video';
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
      const {navigator, cars, onPostClick } = this.props;

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
            <Text>Current Car</Text>
            <ModalDropdown 
                options={getCarOptions(cars.userCars)}
                renderRow={this.renderCarOptionRow.bind(this)}
                onSelect={this.onSelectCar.bind(this)} />
        </View>
        <View style={styles.contentDescriptionContainer}>
          <Image source={{uri: 'https://maxcdn.icons8.com/iOS7/PNG/75/Users/user_male_circle_filled-75.png'}} style={styles.icon} />
          <TextInput
          onChangeText={this.updateDescription.bind(this)}
          placeholder="What's new with car term today? Feeling like: Cruising? Thing? Or something?" 
          returnKeyType='done' 
          multiline={true} 
          style={{flex:1, marginTop: 20, paddingVertical: 10, borderWidth: 1, borderColor: '#000000'}}/>
        </View>
        <View style={{flex:1, borderBottomWidth: 2, borderBottomColor: '#000000'}}>
        </View>
        <View style={styles.tagsContainer}>
            <Text>Tags</Text>
            <ListView
            horizontal={true}
            style={{flex:1}}
            dataSource={this.state.tagsDataSource}
            scrollEnabled={false}
            renderRow={(rowData) => <Text style={{paddingHorizontal: 5, borderWidth: 1}}>{rowData}</Text>}/>
        </View>
        <View>
            <ListView
            horizontal={true}
            style={{flex:1}}
            dataSource={this.state.contentDataSource}
            scrollEnabled={false}
            renderRow={(data) => galleryContent(data)}
            />
        </View>
        {
            this.addPost.canAddContent ? this.showMenuBar() : this.showNextButton(onPostClick)
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

const onCancelPress = (navigator) => {
  navigator.pop()
}

const getCarOptions = (cars) => {
    const carOptions = cars.map((car) => {
        const carDetails = {id: car.carInfo.id, model: car.carInfo.car.model, make: car.carInfo.car.make, yearOfManufacture: car.carInfo.car.yearOfManufacture, image: car.carInfo.image}
        return carDetails;
    });

    return carOptions;
}

const galleryContent = (data) => {
    
    if(data.type === "image") {
        return <FitImage key={data.uri} resizeMode={Image.resizeMode.contain} source={{uri: data.uri}} style={styles.postPhoto} />
    }
    
    if(data.type === "video") {
        return <ListVideo key={data.uri} paused={true} uri={data.uri} onVideoPress={() => { this.paused === true ? this.paused = false : this.paused = true}} />;
    }
}

const executeMediaPicker = (config) => {

    
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
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  postPhoto: {
        height: 120,
        width: 120,
        borderRadius: 5,
        padding: 5,
        margin: 3
    },
})