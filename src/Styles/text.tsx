import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // === Container Styles ===
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', //or center
    marginRight: 20
  },
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
  },
  statsCaptionText: {
    fontSize: 12,
    fontWeight: '200'
  },
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
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '700',
    paddingBottom: 10,
  },
  titleWhite: {
    fontSize: 40,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  headingTwoWhite: {
    fontSize: 35,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  headingThreeWhite: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  paragraphWhite: {
    // marginTop: 30,
    fontSize: 21,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  paragraphBoldWhite: {
    // marginTop: 30,
    fontSize: 21,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
  },
  paragraphBoldHighlightWhite: {
    // marginTop: 30,
    fontSize: 21,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  captionWhite: {
    marginTop: 30,
    fontSize: 21,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
