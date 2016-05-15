import React, {
  StyleSheet,
  WebView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { paramsToObject, objKeysToCamel } from '../Utils'

const styles = StyleSheet.create({

})

const getBearer = (url = '') => {
  const split = url.split('#')

  return new Promise((resolve, reject) => {
    if (split.length !== 2) {
      return
    }

    const params = split[1].split('&')
    const token = objKeysToCamel(paramsToObject(params))
    console.log(token)
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
  <Icon.Button name='facebook' onPress={onPress}>Sign In</Icon.Button>
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
    .then(token => onAuthSuccess(token))
    .catch(err => onAuthError(err))
}

const AuthView = props => {
  const uri = getUri(props)
  const {
    onAuthSuccess,
    onAuthError
  } = props

  return (
    <WebView
      automaticallyAdjustContentInsets={Boolean(false)}
      style={styles.webView}
      source={{ uri }}
      javaScriptEnabled={Boolean(true)}
      domStorageEnabled={Boolean(true)}
      decelerationRate='normal'
      onNavigationStateChange={(nav) => checkState({ uri: props.uri, nav, onAuthSuccess, onAuthError })}
      startInLoadingState={Boolean(true)}
      scalesPageToFit={Boolean(true)} />
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

