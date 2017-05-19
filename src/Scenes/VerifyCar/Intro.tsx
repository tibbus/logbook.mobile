import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { NextButton } from '../../Components/Button';
import textStyle from '../../Styles/text';
import { GradientView } from '../../Components/Views';

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
                <Text style={textStyle.titleWhite}>Why verify?</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={textStyle.headingTwoWhite}>Psst. It's optional</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={textStyle.paragraphWhite}>
                  Description of some sort goes over here. Explain why we need and where to find V Number
                                </Text>
                <Text style={textStyle.paragraphWhite}>But you'll have to verify later.</Text>
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
  },
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  },
});