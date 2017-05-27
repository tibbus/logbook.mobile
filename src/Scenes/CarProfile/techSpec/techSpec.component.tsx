import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { styles } from './techSpec.styles';

const getTaxInfo = (car) => {

  if (car && car.tax) {
    return (
      <View>
        <Text>Status : {car.tax.taxStatus}</Text>
        <Text>Renewal : {car.tax.expiryDate}</Text>
      </View>
    )
  }
}

export class TechSpec extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { car } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>DVLA</Text>

        <View style={styles.row}>
          <Text style={styles.category}>Make:</Text><Text style={styles.value}>{car.carInfo.car.make}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Model:</Text><Text style={styles.value}>{car.carInfo.car.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Year:</Text><Text style={styles.value}>{car.carInfo.car.yearOfManufacture}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Colour:</Text><Text style={styles.value}>{car.carInfo.colour}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Fuel Type:</Text><Text style={styles.value}>{car.carInfo.fuelType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Transmission:</Text><Text style={styles.value}>{car.carInfo.transmission}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Capacity:</Text><Text style={styles.value}>{car.carInfo.cylinderCapacity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Reg. Number:</Text><Text style={styles.value}>{car.carInfo.registrationNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Wheel Plan:</Text><Text style={styles.value}>{car.carInfo.wheelPlan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>Weight:</Text><Text style={styles.value}>{car.carInfo.weight}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.category, styles.last]}>CO2 Emission:</Text><Text style={styles.value}>{car.carInfo.cO2Emission}</Text>
        </View>
      </View>
    );
  }
}
