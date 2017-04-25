import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { NextButton } from '../../Button'
import { HeadingOneWhite, HeadingTwoWhite, ParagraphWhite } from '../../Text'
import { GradientView } from '../../Views'

export class Intro extends Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
      const { onVerify, onVerifyLater } = this.props;
      return (
          <GradientView>
            <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                <View style={{ marginTop: 40 }}>
                    {HeadingOneWhite(() => "Why verify?")}
                </View>
                <View style={{ marginTop: 20 }}>
                    {HeadingTwoWhite(() => "Psst. It's optional")}
                </View>
                <View style={{ marginTop: 30 }}>
                    {ParagraphWhite(() => "Description of some sort goes over here. Explain why we need and where to find V Number.")}
                    {ParagraphWhite(() => "But you'll have to verify later.")}
                </View>
                </View>
            </View>
            <View style={{ marginBottom: 20 }}>
                {NextButton(() => onVerify(), "Verify")}
                {NextButton(() => onVerifyLater(), "Verify Later")}
            </View>
            </View>
         </GradientView>
        )
    }
}

const paddingHorizontal = 30
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "flex-start",
  } as React.ViewStyle,
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  } as React.ViewStyle,
});