import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NextButton } from '../../Components/Button';
import { GradientView } from '../../Components/Views';

import textStyle from '../../Styles/text';
import palette from '../../Styles/Themes/palette';

export class Success extends Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigator, rootNav } = this.props;
    return (
      <GradientView>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{ marginTop: 40 }}>
              <Text style={textStyle.titleWhite}>Success! Car added to garage</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={textStyle.paragraphBoldHighlightWhite}>It's been a workout. We're family now</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 30 }}>
              <Icon name='check-circle' style={{ fontSize: 150, color: palette.success }} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          {NextButton(() => console.log("complete"), "Add your car photo")}
          {NextButton(() => rootNav.push({ id: 'profile' }), "View Profile")}
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