import React, { Component } from 'react';
import { Text, TextInput, View, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './requestForm.styles';
import { NextButton } from '../../../Components/Button';
import { GradientView } from '../../../Components/Views';
import textStyle from '../../../Styles/text';
import palette from '../../../Styles/Themes/palette';

export class RequestForm extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      email: '',
      regNo: ''
    }
  }

  render() {
    var regNoLimit = 9;
    const { submitRequestInvite } = this.props
    return (
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
                <TextInput autoCapitalize='characters' style={styles.textInput}
                  placeholder='E.g. Alex Jones'
                  placeholderTextColor='rgba(255, 255, 255, 0.2)'
                  returnKeyType='next'
                  maxLength={regNoLimit}
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.fullName} />
              </View>
            </View>

            <View style={{ flex:1 }}>
              <Text style={textStyle.headingThreeWhite}>Email:</Text>
            
              <View style={styles.underline}>
                <TextInput autoCapitalize='characters' style={styles.textInput}
                  placeholder='E.g. alex.jones@gmail.com'
                  placeholderTextColor='rgba(255, 255, 255, 0.2)'
                  returnKeyType='next'
                  keyboardType='email-address'
                  maxLength={regNoLimit}
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.email} />
              </View>
            </View>

            <View style={{ flex:1 }}>
              <Text style={textStyle.headingThreeWhite}>Vehical Registration No.</Text>

              <View style={styles.underline}>
                <TextInput autoCapitalize='characters' style={styles.textInput}
                  placeholder='E.g. LOG8 00K'
                  placeholderTextColor='rgba(255, 255, 255, 0.2)'
                  returnKeyType='next'
                  maxLength={regNoLimit}
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.regNo} />
              </View>
            </View>
            
            <View style={{marginTop: 10, flex: 0.8}}>
              <TouchableHighlight style={{backgroundColor: palette.primaryBlack, flex: 1, marginVertical: 20, alignItems: 'center', justifyContent: 'center'}} onPress={() => console.log("Test")}>
                  <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 1)'}}>Request Invite</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {/*<View style={{ marginBottom: 5, marginTop: 5 }}>
          {NextButton(() => submitRequestInvite(this.state.fullName, this.state.email, this.state.regNo), 'Request Invite')}
        </View>*/}
      </GradientView>
    )
  }
}