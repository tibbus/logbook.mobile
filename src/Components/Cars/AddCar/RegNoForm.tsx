import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NextButton } from '../../Button';
import textStyle from '../../../Styles/text';
import { GradientView } from '../../Views';
import palette from '../../../Styles/Themes/palette';

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
      <GradientView>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{ marginTop: 40 }}>
              <Text style={textStyle.titleWhite}>Add your car to your garage</Text>
            </View>
            <Text style={textStyle.captionWhite}>'We use your Vehical Registration No. to add relevant info about your car from the DVLA</Text>
            <View style={{ marginTop: 60 }}>
              <Text style={textStyle.headingThreeWhite}>Vehical Registration No.</Text>
            </View>
            <View style={styles.underline}>
              <TextInput autoCapitalize='characters' style={styles.textInput}
                placeholder='E.g. LOG8 00K'
                placeholderTextColor='rgba(255, 255, 255, 0.2)'
                returnKeyType='next'
                maxLength={regNoLimit}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          {NextButton(() => carRegSubmit(this.state.text), 'Check')}
        </View>
      </GradientView>
    )
  }
}

const paddingHorizontal = 30
const textInputHeight = 60
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-around',
    // justifyContent: 'center',
    alignItems: "flex-start",
    //backgroundColor: palette.secondary
  } as React.ViewStyle,
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  } as React.ViewStyle,
  underline: {
    height: textInputHeight,
    width: width - (2 * paddingHorizontal),
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  } as React.ViewStyle,
  textInput: {
    height: textInputHeight,
    //marginVertical: 30, 
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    //backgroundColor: 'black'
  },
})