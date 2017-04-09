import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native'
import { NextButton } from '../../Button'
import { HeadingOneWhite, HeadingTwoWhite, ParagraphWhite } from '../../Text'
import { GradientView } from '../../Views'
import palette from '../../../Themes/palette';

export class Confirm extends Component<any, any> {
    private vinNumbers: any;

    constructor(props) {
        super(props)
        this.vinNumbers = {
            first: '',
            second: '',
            last: ''
        };
    }

  render() {
      const { onConfirm, userId, carInfoId } = this.props;
      return (
          <GradientView>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <View style={{ marginTop: 40 }}>
                            {HeadingOneWhite(() => "Let's verify")}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {HeadingTwoWhite(() => "It's how we roll")}
                        </View>
                        <View style={{ marginTop: 30 }}>
                            {ParagraphWhite(() => "To verify ownership we'd like the following characters from your VIN No.")}
                            {ParagraphWhite(() => "Where to find your VIN")}
                        </View>
                    </View>
                    <View style={styles.rowSubContainer}>
                        <View style={styles.subContainer}>
                            <Text style={styles.vinCaptionText}>1st:</Text>
                            <TextInput
                                    onChangeText={(text) => { this.vinNumbers.first = text }}
                                    placeholderTextColor={palette.inactive}
                                    returnKeyType='done'
                                    maxLength={1}
                                    multiline={false}
                                    style={styles.vinInput} />
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.vinCaptionText}>2nd:</Text>
                            <TextInput
                                    onChangeText={(text) => { this.vinNumbers.second = text }}
                                    placeholderTextColor={palette.inactive}
                                    returnKeyType='done'
                                    maxLength={1}
                                    multiline={false}
                                    style={styles.vinInput} />
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.vinCaptionText}>17th:</Text>
                                <TextInput
                                    onChangeText={(text) => { this.vinNumbers.last = text }}
                                    placeholderTextColor={palette.inactive}
                                    returnKeyType='done'
                                    maxLength={1}
                                    multiline={false}
                                    style={styles.vinInput} />
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    {NextButton(() => checkInput(this.vinNumbers,() => onConfirm(userId, carInfoId, this.vinNumbers)), "Confirm")}
                </View>
            </View>
         </GradientView>
        )
    }
}

const checkInput = (vinNumbers, onConfirm) => {
    if(vinNumbers.first === '' || vinNumbers.second === '' || vinNumbers.last === '') {
        return (
            Alert.alert('Missing Input', 'Please fill in all the vin numbers', [ {text: 'OK', onPress: () => console.log('OK Pressed!')} ])
        )
    }

    onConfirm();
}

const paddingHorizontal = 30
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "flex-start",
  } as React.ViewStyle,
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  } as React.ViewStyle,
  rowSubContainer: {
    flex: 2,
    alignItems: "flex-start",
    flexDirection: 'row'
  } as React.ViewStyle,
  vinCaptionText: {
    //flex: 1,
    //height: 80,
    fontSize: 20,
    //lineHeight: 200,
    color: 'white',
    marginTop: 10,
  },
  vinInput: {
        //flex: 1,
        height: 80,
        fontSize: 20,
        lineHeight: 100,
        color: 'white',
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 2
        // backgroundColor: 'black'
    }
});