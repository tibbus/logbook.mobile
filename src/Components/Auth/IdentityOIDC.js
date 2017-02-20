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
    <View style={styles.container}>
    <StatusBar style={styles.statusBar}
    setHidden='hidden'/>
     <Image
        source={require('../../Assets/Images/SignInPage.jpg')}
        style={styles.image}
        resizeMode="contain">
        <View style={styles.contentView}>
            <Text style={styles.productName}>Logbook</Text>
            <Text style={styles.productLine}>All your car stuff, in one place</Text>
            <View style={styles.loginButtonView}>
              <TouchableHighlight onPress={() => attemptAuth('Facebook')}>
                <View style={[styles.loginButton, styles.facebookLoginButton]}>
                  <View style={styles.loginLogoView} >
                    <Image style={styles.loginLogo} source={require('../../Assets/Images/FacebookLogo.png')}/>
                  </View>
                  <View>
                    <Text style={styles.buttonText, styles.facebookLoginButtonText}>Continue with Facebook</Text>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => attemptAuth('Google')}>
                <View style={[styles.loginButton, styles.googleLoginButton]}>
                  <View style={styles.loginLogoView}>
                    <Image style={styles.loginLogo} source={require('../../Assets/Images/GoogleLogo.png')}/>
                  </View>
                  <View>
                    <Text style={styles.googleLoginButtonText}>Continue with Google</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <Text style={styles.messageLine}>A crafted experience for you made possible by connecting your social media accounts</Text>
          </View>
        </Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'transparent',
    //barStyle: 'light-content',
  },
  image: {
    width,
    height,
  },
  contentView:{
    paddingTop: height - 380
  },
  loginButtonView:{
    marginTop: 50
  },
  loginLogoView: {
    marginLeft: 20,
    marginRight: 20
  },
  loginLogo: {
    width: 30,
    height: 30,
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius : 3,
    flexDirection:'row'
  },
  facebookLoginButton: {
    backgroundColor: "#3C5A96",
  },
  facebookLoginButtonText: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 20
  },
  googleLoginButton: {
    backgroundColor: "#FFFFFF"
  },
  googleLoginButtonText: {
    fontWeight: "600",
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 20
  },
  productName: {
    fontSize: 40,
    fontWeight: "700",
    color: 'rgba(255, 255, 255, 1.0)',
    marginHorizontal: 35
  },
  productLine: {
    fontSize: 20,
    fontWeight: "600",
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 10,
    marginHorizontal: 35
  },
  messageLine: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 25,
    marginHorizontal: 35
  }

});
