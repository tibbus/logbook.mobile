import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import palette from '../../Styles/Themes/palette';

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  /* ====== General styles ====== */
  container: {
    flex: 1,
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 20,
  },
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
  captionColumnContainer: {
    width: 170,
    paddingRight: 5
  },
  captionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  captionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.primary,
  },
  captionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderColor: palette.primary,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 3,
  },
  /* ====== Next button styles ====== */
  nextButtonText: {
    color: palette.text,
  },
  nextButton: {
    backgroundColor: 'transparent',
    marginHorizontal: 30,
  },
  nextButtonBorder: {
    width: width,
    paddingVertical: 30,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  nextIcon: {
    fontSize: 15,
    paddingTop: 6,
  },
  /* ====== Action button styles ====== */
  actionButtonText: {
    color: palette.text,
  },
  actonButton: {
    color: palette.secondary,
    backgroundColor: 'transparent',
    marginHorizontal: 30,
  },
  /* ====== Icon button styles ====== */
  iconButton: {
    fontSize: 25,
    fontWeight: '700',
    color: palette.secondary,
  },
});
