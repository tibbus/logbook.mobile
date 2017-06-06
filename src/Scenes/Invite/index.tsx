import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import {  View, Alert, AsyncStorage } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import { RequestForm } from './requestForm/requestForm.component';
import { RequestView } from './requestView/requestView.component';
import { StatusView } from './statusview/statusview.component';

import { submitInvite, getInviteStatus } from '../../Actions/invite'
import { LoadingView } from '../../Components/LoadingView';


const stateToProps = ({ invites, loadingStatus }) => ({ invites, loadingStatus });

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
          <LoadingView style={{flex:1}}
            isLoading={this.props.loadingStatus.invitesLoading}>
            <RequestForm postInviteRequest={(inviteDetails) => dispatch(submitInvite(
              inviteDetails,
              (inviteReference) => onSuccess(inviteReference, navigator), 
              () => Alert.alert("UnSuccessful", "Your invite request failed.")))}/>
            </LoadingView>
        )

      case 'statusView':
        return (
           <LoadingView style={{flex:1}}
            isLoading={this.props.loadingStatus.invitesLoading}>
              <StatusView invitePending={invitePending} getInviteStatus={() => dispatch(getInviteStatus(invites[0].inviteReference))} onContinuePress={() => onContinuePress(rootNav)}/>
          </LoadingView>
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

const onContinuePress = (navigator) => {
    try {

    AsyncStorage.setItem('inviteAccepted', JSON.stringify('true'));
    navigator.push({id:'signin'});

  } catch (error) {
    console.log(error);
  }
}