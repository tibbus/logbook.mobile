import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
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
    const { completeProfile, viewProfile } = this.props;
    return (
      <GradientView>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{ marginTop: 40 }}>
              {HeadingOneWhite(() => "Success! Car added to garage")}
            </View>
            <View style={{ marginTop: 20 }}>
              {ParagraphBoldHighlightWhite(() => "Well done! It's been a workout. Something Uplifting")}
            </View>
            <View style={{ alignItems: 'center', padding: 30 }}>
            <Icon name='check-circle' style={{ fontSize: 150, color: palette.success }} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          {NextButton(() => console.log('complete'), "Add your car photo")}
          {NextButton(() => console.log('view profile'), "View Profile")}
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