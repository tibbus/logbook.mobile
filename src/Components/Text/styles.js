import React from 'react';
import {
  StyleSheet,
 } from 'react-native';

export default StyleSheet.create({
   // === Container Styles ===
   statsContainer: {
     flex: 1,
     flexDirection:'column',
     alignItems: 'flex-start',
   },
   settingsContainer: {
     flex: 1,
     flexDirection:'column',
     alignItems: 'flex-end', //or center
   },
   // === Text Styles ===
   statsText: {
     fontSize: 20,
     fontWeight: '700',
     paddingBottom: 5
   },
   captionText: {
     fontSize: 16,
     fontWeight: '200'
   },
   icon: {
     fontSize: 25,
     fontWeight: '700',
     paddingBottom: 3,
     //marginRight:
     //color: palette.secondary,
   },
   textTitle: {
     marginLeft: 20,
     marginTop: 5,
     fontSize: 35,
     fontWeight: '700',
     //numberOfLines: 2
   }
 });
