import React from 'react'
import {
  StatusBar,
  Image,
  WebView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import { BackScene } from '../Scenes'
import { hashToObj } from '../../Utils'
import { FacebookButton, GoogleButton } from '../Button'

const { width, height } = Dimensions.get("window");

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

const nonce = (new Date()).getTime()
const getUri = ({
  clientId,
  uri,
  authEndpoint,
  scopes = [],
  redirectUri,
  authService
}) => (
  `${uri}${authEndpoint}?client_id=${clientId}&scope=${scopes.join(' ')}&response_type=id_token token` +
  `&redirect_uri=${redirectUri}&nonce=${nonce}&acr_values=idp:${authService}`
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
    <BackScene style={{ flex: 1 } as any} title='Sign In' onBack={() => onAuthError('cancelled')}>
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
    <View style={styles.container}>
    {/* <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        /> */}
     <Image
        source={require('../../Assets/Images/SignInPage.jpg')}
        style={styles.image}
        resizeMode='contain'>
        <View style={styles.container}/>
        <View style={styles.contentView}>
            <Text style={styles.productName}>Logbook</Text>
            <Text style={styles.productLine}>All your car stuff, in one place</Text>
            <View style={styles.container}/>
            <View style={styles.loginButtonView}>
              {FacebookButton(() => attemptAuth('Facebook'))}
              {GoogleButton(() => attemptAuth('Google'))}
              <View style={styles.container}/>
              <Text style={styles.messageLine}>A crafted experience for you made possible by connecting your social media accounts</Text>
            </View>
          </View>
        </Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height,
  },
  contentView:{
    flex: 1.5,
  },
  loginButtonView:{
    flex: 4,
  },
  productName: {
    fontSize: 40,
    fontWeight: "700",
    color: 'rgba(255, 255, 255, 1.0)',
    marginHorizontal: width/10 //35
  } as React.TextStyle,
  productLine: {
    fontSize: 20,
    fontWeight: "600",
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: height/70, //10
    marginHorizontal: width/10 //35
  } as React.TextStyle,
  messageLine: {
    flex: 3,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: width/10 //35
  }
});
