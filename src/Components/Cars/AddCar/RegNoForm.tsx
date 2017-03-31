import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
//import LinearGradient from 'react-native-linear-gradient'
import { HeadingOneWhite, HeadingTwoWhite, ParagraphWhite } from '../../Text'
import palette from '../../../Themes/palette';

//const LinearGradient = require('react-native-linear-gradient');
const { width, height } = Dimensions.get("window");

export class RegNoForm extends Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    var regNoLimit = 9;
    const { carRegSubmit } = this.props
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10 }}>
          {HeadingOneWhite (() => 'Add your car to your garage')}
        </View>
        {ParagraphWhite (() => 'We use your Vehical Registration No. to add relevant info about your car from the DVLA')}
        <View style={{ marginTop: 60 }}>
          {HeadingTwoWhite (() => 'Vehical Registration No.')}
        </View>
        <View style={styles.underline}>
          <TextInput autoCapitalize='characters' style={styles.textInput}
            placeholder='E.g. LOG8 00K'
            placeholderTextColor='rgba(255, 255, 255, 0.5)'
            returnKeyType='next'
            maxLength={regNoLimit}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text} />
        </View>
        <Icon.Button name='plus' onPress={() => carRegSubmit(this.state.text)}>Next</Icon.Button>
        
        {/*<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} >
          <Text>
            Sign in with Facebook
          </Text>
        </LinearGradient>*/}
      </View>
    )
  }
}

const paddingHorizontal=30
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: "flex-start",
    paddingHorizontal: paddingHorizontal,
    backgroundColor: palette.secondary
  } as React.ViewStyle,
  underline: {
    height: 60,
    width: width-(2*paddingHorizontal),
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
  } as React.ViewStyle,
  textInput: {
    height: 60,
    //marginVertical: 30, 
    color: 'white', 
    fontSize: 30,
    fontWeight: '700',
    //backgroundColor: 'black'
  },
})