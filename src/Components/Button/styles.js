import React from 'react';
import {
  StyleSheet,
  Dimensions,
 } from 'react-native';
 const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  // === OAuth login button styles ===
  // Facebook
  facebookButtonBgd: {
    backgroundColor: "#3C5A96",
  },
  facebookButtonText: {
    color: "#FFF",
  },
  // Google
  googleButtonBgd: {
    backgroundColor: "#FFFFFF"
  },
  googleButtonText: {
    color: 'rgba(0, 0, 0, 0.35)',
  },
  // === Generic button styles ===
  buttonText: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 20
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: height/70,
    marginHorizontal: width/30,
    borderRadius : 3,
    flexDirection:'row'
  },
  // === View styles ===
  loginButtonView:{
    flex: 1, //prev. 4
  },
  loginLogoView: {
    marginLeft: width/20,
    marginRight: width/20
  },
  // === Logo Dimensions ===
  loginLogo: {
    width: height/20,
    height: height/20,
  }
});
