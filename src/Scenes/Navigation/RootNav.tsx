import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import { AsyncStorage } from 'react-native';
import { MainNav } from './MainNav';
import { SignIn } from '../'
import { Invite } from '../Invite/'
import { connect } from '../../Utils/connect';
import { SET_INVITE } from '../../Actions/Types';
import { getInviteStatus } from '../../Actions/invite';
import { LoadingView } from '../../Components/LoadingView';

const configureScene = ({ sceneConfig, id }: any = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  if (id === 'modal') {
    return Navigator.SceneConfigs.FloatFromBottom
  }

  return Navigator.SceneConfigs.FloatFromRight
}

@connect(({ user, invites, loadingStatus }) => ({ user, invites, loadingStatus }))
export class RootNav extends Component<any, any> {

  constructor(props) {
    super(props)

    const {dispatch} = props;
    retrieveStoredInvites(dispatch);
  }


  renderScene(route, navigator) {
    const { dispatch, user, invites } = this.props;

    let routeId = ""; 
    if(invites.some(element => element.status === "Approved")) {
      routeId = !user.token || !user.id ? 'signin' : 'main';
    }
    else {
      routeId = 'invite'
    }

    switch (routeId) {
      case 'main':
        return (<MainNav navigator={navigator} />);
      case 'signin':
        return (<SignIn navigator={navigator} user={user} dispatch={dispatch} />);
      case 'invite':
        return (
            <LoadingView style={{flex:1}}
            isLoading={this.props.loadingStatus.invitesLoading}>
              <Invite navigator={navigator} />
            </LoadingView>
          )
      default:
        return (
            <LoadingView style={{flex:1}}
            isLoading={this.props.loadingStatus.invitesLoading}>
              <Invite navigator={navigator} />
            </LoadingView>
          )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'invite'}}
        configureScene={configureScene}
        renderScene={this.renderScene.bind(this)}
        sceneStyle={{ paddingTop: 20 }}
      />
    )
  }
}

const retrieveStoredInvites = (dispatch) => {
  try {
    AsyncStorage.getItem('inviteReference', (err, result) => {
      
      if (!result) {
          return;
        }
        
        const inviteItem = JSON.parse(result); 
        dispatch({ inviteItem, type: SET_INVITE });
        dispatch(getInviteStatus(inviteItem.inviteReference))
      });
    } catch (error) {
      console.log(error);
    }
}
