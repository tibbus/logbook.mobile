import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import palette from '../../Themes/palette';

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  /* ====== General styles ====== */
  container: {
    flex: 1,
  } as React.ViewStyle,
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
  } as React.ViewStyle,
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  } as React.ViewStyle,
  /* ====== OAuth login button styles ====== */
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
  // === Button styles ===
  loginButtonText: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 20
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: height / 70,
    marginHorizontal: width / 30,
    borderRadius: 3,
    flexDirection: 'row'
  },
  // === View styles ===
  loginButtonView: {
    flex: 1, //prev. 4
  },
  loginLogoView: {
    marginLeft: width / 20,
    marginRight: width / 20
  },
  // === Logo Dimensions ===
  loginLogo: {
    width: height / 20,
    height: height / 20,
  },
  /* ====== Caption button styles ====== */
  captionText: {
    fontSize: 14,
    fontWeight: '600',
  } as React.TextStyle,
  captionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.primary,
  } as React.TextStyle,
  captionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: palette.primary,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 3,
  } as React.ViewStyle,
});
