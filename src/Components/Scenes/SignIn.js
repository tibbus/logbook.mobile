import React, {
  Alert,
  Component,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { IdentityOIDC } from '../Auth'
import { ATTEMPT_OIDC_AUTH, SET_AUTH, SET_AUTH_ERROR } from '../../Actions/Types'
import { getEnvironment } from '../../API/config'
import { setUserProfile } from '../../Actions/user'

const stateToProps = ({ user }) => ({ user })

@connect(stateToProps)
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

    dispatch({ type: SET_AUTH_ERROR })

    if (error === 'cancelled') return
    Alert.alert('Authentication failed')
  }

  render () {
    const { user, dispatch } = this.props

    return (
      <IdentityOIDC
        attemptAuth={() => dispatch({ type: ATTEMPT_OIDC_AUTH })}
        shouldAttempt={user.attemptingOIDC}
        uri={getEnvironment()}
        authEndpoint='identity/connect/authorize'
        clientId='mvc6'
        redirectUri={getEnvironment()}
        scopes={['openid']}
        onAuthSuccess={this.authSuccess.bind(this)}
        onAuthError={this.authError.bind(this)}
      />
    )
  }

}
