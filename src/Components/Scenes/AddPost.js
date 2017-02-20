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
    paddingHorizontal: 10
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

  }
})

export class AddPost extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render () {
    const { carRegSubmit } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableHighlight style={styles.headerButton}>
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
            <TextInput placeholder="What's new with car term today? Feeling like: Cruising? Thing? Or something?" returnKeyType='done' />
        </View>
        <View>
        </View>
        <View style={styles.tagsContainer}>
            <Text>Tags</Text>
            <Text>Car Make</Text>
            <Text>Car Model</Text>
            <Text>Car Year</Text>
        </View>
        <View style={styles.contentContainer}>
            <TouchableHighlight>
              <Text>Gallery</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text>Camera</Text>
            </TouchableHighlight>
        </View>
      </View>
    )
  }
}