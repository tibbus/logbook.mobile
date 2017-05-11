import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // === Container Styles ===
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', //or center
    marginRight: 20
  } as React.ViewStyle,
  settingsContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end', //or center
  },
  // === Text Styles ===
  statsText: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 5,
    alignItems: 'flex-end'
  } as React.TextStyle,
  statsCaptionText: {
    fontSize: 16,
    fontWeight: '200'
  } as React.TextStyle,
  settingsIcon: {
    fontSize: 25,
    fontWeight: '700',
    paddingBottom: 3,
    //marginRight:
    //color: palette.secondary,
  },
  title: {
    marginLeft: 20,
    marginTop: 5,
    fontSize: 35,
    fontWeight: '700',
  } as React.TextStyle,
  subtitle: {
    fontSize: 25,
    fontWeight: '700',
    paddingBottom: 10,
  } as React.TextStyle,
  titleWhite: {
    fontSize: 40,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  } as React.TextStyle,
  headingTwoWhite: {
    fontSize: 35,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
  } as React.TextStyle,
  headingThreeWhite: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
  } as React.TextStyle,
  paragraphWhite: {
    // marginTop: 30,
    fontSize: 21,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  } as React.TextStyle,
  paragraphBoldWhite: {
    // marginTop: 30,
    fontSize: 21,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  } as React.TextStyle,
  paragraphBoldHighlightWhite: {
    // marginTop: 30,
    fontSize: 21,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
  } as React.TextStyle,
  captionWhite: {
    marginTop: 30,
    fontSize: 21,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  } as React.TextStyle,
});
