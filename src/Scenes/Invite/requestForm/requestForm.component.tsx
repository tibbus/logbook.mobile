import React, { Component } from 'react';
import { Text, TextInput, View, Dimensions, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './requestForm.styles';
import { NextButton } from '../../../Components/Button';
import { GradientView } from '../../../Components/Views';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import textStyle from '../../../Styles/text';
import palette from '../../../Styles/Themes/palette';

const KeyboardAwareScrollViewTyped: any = KeyboardAwareScrollView;

export class RequestForm extends Component<any, any> {
  private inviteDetails: any;

  constructor(props) {
    super(props)
    this.inviteDetails = {
        fullName: '',
        email: '',
        regNo: ''
      }
  }

  render() {
    var regNoLimit = 9;
    const { postInviteRequest } = this.props
    return (
      <KeyboardAwareScrollViewTyped style={{ flex: 1 }}>
        <GradientView fullScreen={true}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <View style={{ marginTop: 40 }}>
                <Text style={textStyle.titleWhite}>Hey there!</Text>
                <Text style={textStyle.captionWhite}>'Request an invite to explore Logbook!</Text>
              </View>

              <View style={{ flex:1, marginTop: 40 }}>
                <Text style={textStyle.headingThreeWhite}>Full Name:</Text>

                <View style={styles.underline}>
                  <TextInput style={styles.textInput}
                    ref="fullName"
                    placeholder='E.g. Alex Jones'
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    returnKeyType='next'
                    maxLength={100}
                    onChangeText={(text) => { this.inviteDetails.fullName = text }}
                    onSubmitEditing={() => this.refs["email"].focus()}
                    autoCorrect={false}
                    autoFocus={true}
                    />
                </View>
              </View>

              <View style={{ flex:1 }}>
                <Text style={textStyle.headingThreeWhite}>Email:</Text>
              
                <View style={styles.underline}>
                  <TextInput style={styles.textInput}
                    ref="email"
                    placeholder='E.g. alex.jones@gmail.com'
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    returnKeyType='next'
                    keyboardType='email-address'
                    maxLength={100}
                    onChangeText={(text) => {this.inviteDetails.email = text}}
                    onSubmitEditing={() => this.refs["regNo"].focus()}
                    autoCapitalize="none"
                    />
                </View>
              </View>

              <View style={{ flex:1 }}>
                <Text style={textStyle.headingThreeWhite}>Vehical Registration No.</Text>

                <View style={styles.underline}>
                  <TextInput style={styles.textInput}
                    ref="regNo"
                    placeholder='E.g. LOG8 00K'
                    placeholderTextColor='rgba(255, 255, 255, 0.2)'
                    returnKeyType='next'
                    maxLength={9}
                    onChangeText={(text) => {this.inviteDetails.regNo = text}}
                    />
                </View>
              </View>
              
              <View style={{marginTop: 10, flex: 0.8}}>
                <TouchableHighlight style={{backgroundColor: palette.primaryBlack, flex: 1, marginVertical: 20, alignItems: 'center', justifyContent: 'center'}} onPress={() => validateInput(this.inviteDetails, postInviteRequest(this.inviteDetails), () => Alert.alert("Failed!", "The invite request could not be submitted."))}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 1)'}}>Request Invite</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </GradientView>
      </KeyboardAwareScrollViewTyped>
    )
  }
}

const validateInput = (inviteDetails, onSuccess, onFailure) => {

  let valid = true;

  if (!inviteDetails.fullName) {
    valid = false;
  } 

  if (!inviteDetails.email) {
    valid = false;
  }

  if (!inviteDetails.regNo) {
    valid = false;
  }

  if (valid) {
    onSuccess();
  }
  else {
    onFailure();
  }
}