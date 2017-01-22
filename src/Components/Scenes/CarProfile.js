import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet } from 'react-native'
import { Info, Gallery } from '../Cars/Profile'
import { FitImage } from '../Image'
import { cars } from '../../Actions/cars.js'

const stateToProps = ({ user }) => ({ user });

@connect(stateToProps)
export class CarProfile extends Component {

    constructor () {
        super(...arguments);
    }

    render() {
        const { user, car, carOwner, navigator } = this.props;
        const { image } = car.carInfo;
        return (
            <View style={styles.container}>
                <FitImage resizeMode={Image.resizeMode.contain} source={{uri:image}} style={styles.photo} />
                <Info carMake={car.carInfo.car.make} carModel={car.carInfo.car.model} ownerImage={carOwner.profileImage} ownerName={carOwner.name} />
                
            </View>
        )        
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        alignItems: 'center',
        flexDirection: 'column'
    },
    photo: {
        height: 200,
        width: 350,
        borderRadius: 5
    },
});