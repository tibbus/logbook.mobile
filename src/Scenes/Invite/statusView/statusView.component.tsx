import React, { Component } from 'react'
import {
  Image,
  View,
  TouchableHighlight,
  Text,
  AppState
} from 'react-native';
import { ActionButton } from '../../../Components/Button';
import { styles } from './statusView.styles'
import palette from '../../../Styles/Themes/palette';

  const getActionButtons = (invitePending, onPress) => {
    if(invitePending){
        return (
        <View style={{flex:5}}>
            <View style={{marginTop: 10, backgroundColor: palette.status, flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 1)'}}>Invite Pending</Text>
            </View>
            <View style={{marginTop: 10, flex: 1.5, borderColor: 'rgba(0,0,255,0.2)'}}>
                <TouchableHighlight style={{backgroundColor: 'rgba(0,0,0,1)', borderColor: 'rgba(0,0,255,0.2)', flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'}} onPress={() => console.log("Test")}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 0.75)'}}>We'll let you know soon</Text>
                </TouchableHighlight>
            </View>
        </View>
        )
    }
    else{
        return (
        <View style={{flex:5}}>
            <View style={{marginTop: 10, backgroundColor: palette.status, flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 1)'}}>Invite Accepted</Text>
            </View>
            <View style={{marginTop: 10, flex: 1.5}}>
                <TouchableHighlight style={{backgroundColor: palette.primary, flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'}} onPress={() => onPress()}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 1)'}}>Continue to Logbook</Text>
                </TouchableHighlight>
            </View>
        </View>
        )
    }
  }

export class StatusView extends Component<any, any> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
      AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange= (appState) => {
    if(appState === 'active') {
        const { getInviteStatus } = this.props;
        getInviteStatus();
    }
  }

  render() {
      const { onContinuePress, invitePending } = this.props;
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../Assets/Images/SignInPage.jpg')}
                style={styles.image}
                resizeMode='contain'>
                <View style={styles.container}/>
                <View style={styles.contentView}>
                    <Text style={styles.productName}>Logbook</Text>
                    <Text style={styles.productLine}>All your car stuff, in one place</Text>
                    <View style={styles.container}/>
                    {getActionButtons(invitePending, onContinuePress)}
                    <View style={styles.container}/>
                        <Text style={styles.messageLine}>A crafted experience for you made possible by connecting your social media accounts</Text>
                    </View>
                </Image>
        </View>
        )
    }
}
