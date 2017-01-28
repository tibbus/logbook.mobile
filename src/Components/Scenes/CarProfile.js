import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet } from 'react-native'
import { Info, Gallery } from '../Cars/Profile'
import { FitImage } from '../Image'
import { getCarTimelineImages } from '../../Actions/cars.js'
import { BackScene } from '../Scenes'

const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class CarProfile extends Component {

    constructor () {
        super(...arguments);

        const { car, cars, dispatch } = this.props;
        if(cars.carImagesLoadPending){
            dispatch(getCarTimelineImages(car.carInfo.id,0,15))
        }
    }

    back(navigator) {
        navigator.pop()
    }
    render() {
        const { user, car, cars, carOwner, navigator } = this.props;
        const { image } = car.carInfo;
        return (
            <BackScene onBack={() => this.back(navigator)} title = {car.carInfo.car.make + " " + car.carInfo.car.model}>
                <View style={styles.container}>
                    <View>
                        <FitImage resizeMode={Image.resizeMode.contain} source={{uri:image}} style={styles.photo} />
                        <Info ownerImage={carOwner.profileImage} ownerName={carOwner.name} />
                    </View>
                    <View>
                        <Gallery carImages={cars.carImages} />
                    </View>
                </View>
            </BackScene>
        )        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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