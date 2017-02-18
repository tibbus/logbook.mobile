import React from 'react'
import {
  Image,
  WebView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
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
                    <Text style={styles.facebookLoginButtonText}>Continue with Facebook</Text>
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
            <Text style={styles.appLine}>A crafted experience for you made possible by connecting your social media accounts</Text>
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
    paddingTop: height - 375
  },
  loginButtonView:{
    marginTop: 30
  },
  loginLogoView: {
    marginLeft: 20,
    marginRight: 20
  },
  loginLogo: {
    width: 40,
    height: 40,
  },
  loginButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius : 10,
    flexDirection:'row'
  },
  facebookLoginButton: {
    backgroundColor: "#3C5A96",
  },
  facebookLoginButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  googleLoginButton: {
    backgroundColor: "#FFFFFF"
  },
  googleLoginButtonText: {
    color: "#000000",
    fontSize: 18
  },
  productName: {
    fontSize: 30,
    color: "#FFFFFF",
    marginHorizontal: 35
  },
  productLine: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 10,
    marginHorizontal: 35
  },
  appLine: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 15,
    marginHorizontal: 35
  }

});
