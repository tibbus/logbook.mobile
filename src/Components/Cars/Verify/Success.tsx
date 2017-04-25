import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NextButton } from '../../Button'
import { HeadingOneWhite, ParagraphBoldHighlightWhite } from '../../Text'
import { GradientView } from '../../Views'
import palette from '../../../Themes/palette';

export class Success extends Component<any, any> {

  constructor(props) {
    super(props)
  }

  render() {
    const { viewFeed } = this.props;
    return (
      <GradientView>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{ marginTop: 40 }}>
              {HeadingOneWhite(() => "Success! Car has been verified")}
            </View>
            <View style={{ marginTop: 20 }}>
              {ParagraphBoldHighlightWhite(() => "It's been a workout. We're family now")}
            </View>
            <View style={{ alignItems: 'center', padding: 30 }}>
            <Icon name='check-circle' style={{ fontSize: 150, color: palette.success }} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          {NextButton(() => viewFeed(), "View your feed")}
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
    //justifyContent: 'space-around',
    alignItems: "flex-start",
  } as React.ViewStyle,
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  } as React.ViewStyle,
});