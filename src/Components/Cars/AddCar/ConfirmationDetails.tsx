import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LoadingView } from '../../LoadingView';
import { NextButton } from '../../Button';
import textStyle from '../../../Styles/text';
import { GradientView } from '../../Views';

export class ConfirmationDetails extends Component<any, any> {
  constructor(props) {
    super(props)
  }

  renderView() {
    const { carToConfirm, onConfirm, userId } = this.props;

    if (!carToConfirm) {
      return (
        <View>
          <Text>LOADING</Text>
        </View>
      )
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <View style={{ marginTop: 40 }}>
                <Text style={textStyle.titleWhite}>Here's what we found</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={textStyle.headingTwoWhite}>Is this right?</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={textStyle.paragraphWhite}>LOG8 00K is registed to a {carToConfirm.colour.toLowerCase()}</Text>
                <Text style={textStyle.paragraphBoldWhite}>{carToConfirm.car.make} {carToConfirm.car.model}</Text>
                <Text style={textStyle.paragraphBoldHighlightWhite}>{carToConfirm.car.yearOfManufacture}</Text>
                {/*<Text style={styles.textCarHeading}>{carToConfirm.car.make} {carToConfirm.car.model}</Text>*/}
                {/*<Text style={styles.textCarInfo}>{carToConfirm.car.yearOfManufacture}</Text>*/}
              </View>
            </View>
            {/*<Text style={styles.textCarInfo}>Vehical Colour: {carToConfirm.colour}</Text>*/}
            {/*<Text style={styles.textCarInfo}>Transmission:{carToConfirm.transmission}</Text>*/}
            {/*<Text style={styles.textCarInfo}>Fuel Type:{carToConfirm.fuelType}</Text>*/}
          </View>
          <View style={{ marginBottom: 20 }}>
            {NextButton(() => onConfirm(userId, carToConfirm.id), "That's me")}
          </View>
        </View>
      )
    }
  }
  render() {
    const { carToConfirm, loadingStatus } = this.props;
    const { carsLoading } = loadingStatus;
    const showView = carToConfirm === null;
    return (
      <GradientView>
        <LoadingView style={{ flex: 1 }}
          isLoading={carsLoading}
          hideWhileLoading={showView}>
          {this.renderView()}
        </LoadingView>
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
  // textCarHeading: {
  //   marginLeft: 12,
  //   fontSize: 16,
  // },
  // textCarInfo: {
  //   marginLeft: 12,
  //   fontSize: 12,
  // }
});