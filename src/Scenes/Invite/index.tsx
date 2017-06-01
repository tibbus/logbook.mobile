import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import {  View, Alert, AsyncStorage } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import { RequestForm } from './requestForm/requestForm.component';
import { RequestView } from './requestView/requestView.component';
import { StatusView } from './statusview/statusview.component';

import { submitInvite, getInviteStatus } from '../../Actions/invite'


const stateToProps = ({ invites }) => ({ invites });

@connect(stateToProps)
export class Invite extends Component<any, any> {
  private navigator: any;

  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    let { id } = route;
    const { dispatch, invites } = this.props;
    const rootNav = this.props.navigator;

    let invitePending = true;

    if(invites.length > 0) {
      invitePending = !invites.some(inviteRef => inviteRef.status === "Approved");
      id = 'statusView';
    }
    
    
    switch (id) {
      case 'requestView':
        return (
          <RequestView onRequestInvitePress={() => navigator.push({id: 'requestForm'})}/>
        )
      case 'requestForm':
        return (
          <RequestForm postInviteRequest={(inviteDetails) => dispatch(submitInvite(
            inviteDetails,
            (inviteReference) => onSuccess(inviteReference, navigator), 
            () => Alert.alert("UnSuccessful", "Your invite request failed.")))}/>
        )

      case 'statusView':
        return (
            <StatusView invitePending={invitePending} onContinuePress={() => rootNav.push({id:'signin'})}/>
        )

      default:
        return (
          <RequestView navigator={navigator}/>
        )
    }
  }

  render() {
    //
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ id: 'requestView' }}
        renderScene={this.renderScene.bind(this)} />)
  }
}

const onSuccess = (inviteItem, navigator) => {
  try {

    AsyncStorage.setItem('inviteReference', JSON.stringify(inviteItem));
    navigator.push({id:'statusView'});

  } catch (error) {
    console.log(error);
  }
}