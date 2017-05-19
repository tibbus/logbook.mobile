import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    const { viewFeed } = this.props;
    return (
      <GradientView>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={{ marginTop: 40 }}>
              <Text style={textStyle.titleWhite}>Success! Car has been verified</Text>
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
  },
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  },
});