import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import { LoadingView } from '../../LoadingView'


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
        <View style={styles.container}>
          <Text>Is this you?</Text>
          <View style={styles.subContainer}>
            <Text style={styles.textCarHeading}>{carToConfirm.car.make} {carToConfirm.car.model}</Text>
            <Text style={styles.textCarInfo}>{carToConfirm.car.yearOfManufacture}</Text>
          </View>
          <Text style={styles.textCarInfo}>Vehical Colour: {carToConfirm.colour}</Text>
          <Text style={styles.textCarInfo}>Transmission:{carToConfirm.transmission}</Text>
          <Text style={styles.textCarInfo}>Fuel Type:{carToConfirm.fuelType}</Text>
          <TouchableHighlight onPress={() => onConfirm(userId, carToConfirm.id)}>
            <Text>Next  ></Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
  render() {
    const { carToConfirm, loadingStatus } = this.props;
    const { carsLoading } = loadingStatus;
    const showView = carToConfirm === null;
    return (
      <LoadingView style={{ flex: 1 }}
        isLoading={carsLoading}
        hideWhileLoading={showView}>
        {this.renderView()}
      </LoadingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 12,
    alignItems: 'center',
  } as React.ViewStyle,
  subContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  } as React.ViewStyle,
  textCarHeading: {
    marginLeft: 12,
    fontSize: 16,
  },
  textCarInfo: {
    marginLeft: 12,
    fontSize: 12,
  }
});