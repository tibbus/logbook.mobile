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
        <View style={{flex: 1}}/>
        <View style={styles.contentView}>
            <Text style={styles.productName}>Logbook</Text>
            <Text style={styles.productLine}>All your car stuff, in one place</Text>
            <View style={{flex: 1}}/>
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
              <View style={{flex: 1}}/>
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
  statusBar: {
    backgroundColor: 'transparent',
    //barStyle: 'light-content',
  },
  image: {
    width,
    height,
  },
  contentView:{
    //paddingTop: height - (height/1.8)
    flex: 1.5,
  },
  loginButtonView:{
    //marginTop: height/15
    flex: 4,
  },
  loginLogoView: {
    marginLeft: width/20,
    marginRight: width/20
  },
  loginLogo: {
    width: height/20,
    height: height/20,
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: height/70, //10
    marginHorizontal: width/30, //20
    borderRadius : 3,
    flexDirection:'row'
  },
  facebookLoginButton: {
    backgroundColor: "#3C5A96",
  },
  facebookLoginButtonText: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: width/20 //20
  },
  googleLoginButton: {
    backgroundColor: "#FFFFFF"
  },
  googleLoginButtonText: {
    fontWeight: "600",
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: width/20 //20
  },
  productName: {
    fontSize: width/10, //40
    fontWeight: "700",
    color: 'rgba(255, 255, 255, 1.0)',
    marginHorizontal: width/10 //35
  },
  productLine: {
    fontSize: width/20, //20
    fontWeight: "600",
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: height/70, //10
    marginHorizontal: width/10 //35
  },
  messageLine: {
    flex: 3,
    fontSize: width/25, //14
    color: 'rgba(255, 255, 255, 0.4)',
//    marginTop: height/30, //25
    marginHorizontal: width/10 //35
  }

});
