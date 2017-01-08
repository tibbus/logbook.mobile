import React from 'react'
import {
  WebView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BackScene } from '../Scenes'
import { hashToObj } from '../../Utils'

const getBearer = (url = '') => {
  return new Promise((resolve, reject) => {
    const token = hashToObj(url)
    if (!token) return

    const { error, idToken } = token
    if (error) {
      return reject(error)
    }

    if (idToken) {
      return resolve(token)
    }
  })
}

const AuthButton = ({
  onPress
}) => (
  <Icon.Button name='sign-in' onPress={onPress}>Sign In</Icon.Button>
)

const nonce = (new Date()).getTime()
const getUri = ({
  clientId,
  uri,
  authEndpoint,
  scopes = [],
  redirectUri
}) => (
  `${uri}${authEndpoint}?client_id=${clientId}&scope=${scopes.join(' ')}&response_type=id_token token` +
  `&redirect_uri=${redirectUri}&nonce=${nonce}`
)

const checkState = ({
  uri,
  nav,
  onAuthSuccess,
  onAuthError
}) => {
  const { url, loading } = nav

  if (loading || !url.match(uri)) return

  getBearer(url)
    .then(token => {
      onAuthSuccess(token);
    })
    .catch(err => {
      onAuthError(err);
  })
}

const AuthView = props => {
  const uri = getUri(props)
  const {
    onAuthSuccess,
    onAuthError
  } = props

  return (
    <BackScene style={{ flex: 1 }} title='Sign In' onBack={() => onAuthError('cancelled')}>
      <WebView
        automaticallyAdjustContentInsets={Boolean(false)}
        source={{ uri }}
        javaScriptEnabled={Boolean(true)}
        domStorageEnabled={Boolean(true)}
        decelerationRate='normal'
        onNavigationStateChange={(nav) => checkState({ uri: props.uri, nav, onAuthSuccess, onAuthError })}
        startInLoadingState={Boolean(true)}
        scalesPageToFit={Boolean(false)} />
    </BackScene>
  )
}
export const IdentityOIDC = props => {
  const {
    attemptAuth, shouldAttempt
  } = props
  if (shouldAttempt) {
    return (
      <AuthView {...props} />
    )
  }

  return (
    <AuthButton onPress={attemptAuth} />
  )
}
