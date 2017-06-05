import React from 'react'
import {  StyleSheet, Dimensions, TextStyle } from 'react-native';

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
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
  } as TextStyle,
  productLine: {
    fontSize: 20,
    fontWeight: "600",
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: height/70, //10
    marginHorizontal: width/10 //35
  } as TextStyle,
  messageLine: {
    flex: 3,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: width/10 //35
  }
});
