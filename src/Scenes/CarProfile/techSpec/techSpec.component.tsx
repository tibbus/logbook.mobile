import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

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
        super(props)
    }

    render() {
        const { car } = this.props;
        return (
            <View style={styles.scrollView}>
                <View style={{ height: 300 }}>
                    <Text>DVLA</Text>
                    {getTaxInfo(car)}
                </View>
                <View style={styles.separator}></View>
                <View style={{ height: 300 }}>
                    <Text>Details</Text>
                    <Text>Colour : {car.carInfo.colour}</Text>
                    <Text>Fuel Type: {car.carInfo.fuelType}</Text>
                    <Text>Transmission : {car.carInfo.transmission}</Text>
                    <Text>Capacity: {car.carInfo.cylinderCapacity}</Text>
                </View>
            </View>
        );
    }
}
