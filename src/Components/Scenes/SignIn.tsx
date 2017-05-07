import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';

import { IdentityOIDC } from '../Auth';
import { ATTEMPT_OIDC_AUTH, SET_AUTH, SET_AUTH_ERROR } from '../../Actions/Types';
import { getEnvironment } from '../../API/config';
import { getIdentityEnvironment } from '../../API/config';
import { setUserProfile } from '../../Actions/user';
import { dispatch } from '../../store';

export class SignIn extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // logout -->
    //AsyncStorage.removeItem('token:auth');
    try {
      AsyncStorage.getItem('token:auth', (err, result) => {
        if (!result) {
          this.setState({loading: false});
          return;
        }

        const token = JSON.parse(result); 

        dispatch({ token, type: SET_AUTH });
        dispatch(setUserProfile);
      });
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }
  }

  signIn (method: String) {
    const id = `sign-in-${method}`
    this.props.navigator.push({
      id
    })
  }

  renderMessage ({ name, tokenExpired }) {
    const message =
      tokenExpired
        ? `Sorry ${name}, you have been signed out`
        : `Welcome ${name}`
    return (
      <Text>{message}</Text>
    )
  }

  authSuccess = token => { console.log(token);
    try {
      AsyncStorage.setItem('token:auth', JSON.stringify(token));
      //AsyncStorage.setItem('token:auth', null);
    } catch (error) {
      console.log(error);
    }

    dispatch({ token, type: SET_AUTH });
    dispatch(setUserProfile);
  }

  authError = error => {
    dispatch({ type: SET_AUTH_ERROR, error });
  }

  attemptAuth = authService => {
    dispatch({ type: ATTEMPT_OIDC_AUTH, authService: authService });
  }

  render () {
    const { user } = this.props;

    if (this.state.loading) {
      return null;
    }

    return (
      <IdentityOIDC
        attemptAuth={this.attemptAuth}
        shouldAttempt={user.attemptingOIDC}
        authService={user.authService}
        uri={getIdentityEnvironment()}
        authEndpoint='connect/authorize'
        clientId='mycarbiowebapp'
        redirectUri={getIdentityEnvironment()}
        scopes={['openid', 'profile', 'mycarbioapi']}
        onAuthSuccess={this.authSuccess}
        onAuthError={this.authError}
      />
    )
  }
}
