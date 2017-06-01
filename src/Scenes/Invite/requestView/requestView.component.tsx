import React, { Component } from 'react'
import {
  Image,
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import { PrimaryActionButton } from '../../../Components/Button';
import { styles } from './requestView.styles'
import palette from '../../../Styles/Themes/palette';

export class RequestView extends Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
      const { onRequestInvitePress } = this.props;
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
                <View style={{marginTop: 10, flex: 1.5}}>
                    <TouchableHighlight style={{backgroundColor: palette.primary, flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'}} onPress={onRequestInvitePress}>
                        <Text style={{ fontSize: 20, fontWeight: "600", color: 'rgba(255, 255, 255, 1)'}}>Request Invite</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.container}/>
                    <Text style={styles.messageLine}>A crafted experience for you made possible by connecting your social media accounts</Text>
                </View>
            </Image>
        </View>
        )
    }
}
