import React, { Component } from 'react'
import {
  Text
} from 'react-native'
import { IdentityOIDC } from '../Auth'
import { ATTEMPT_OIDC_AUTH, SET_AUTH, SET_AUTH_ERROR } from '../../Actions/Types'
import { getEnvironment } from '../../API/config'
import { getIdentityEnvironment } from '../../API/config'
import { setUserProfile } from '../../Actions/user'

export class SignIn extends Component {

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

  authSuccess (token) {
    const { dispatch } = this.props

    dispatch({ token, type: SET_AUTH })
    dispatch(setUserProfile())
  }

  authError (error) {
    const { dispatch } = this.props

    dispatch({ type: SET_AUTH_ERROR, error })
  }

  render () {
    const { user, dispatch } = this.props

    return (
      <IdentityOIDC
        attemptAuth={() => dispatch({ type: ATTEMPT_OIDC_AUTH })}
        shouldAttempt={user.attemptingOIDC}
        uri={getIdentityEnvironment()}
        authEndpoint='connect/authorize'
        clientId='mycarbiowebapp'
        redirectUri={getEnvironment()}
        scopes={['openid']}
        onAuthSuccess={this.authSuccess.bind(this)}
        onAuthError={this.authError.bind(this)}
      />
    )
  }

}
