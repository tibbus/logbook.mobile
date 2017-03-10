import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Info, Gallery } from '../Cars/Profile'
import { FitImage } from '../Image'
import { getCarTimelineContent } from '../../Actions/cars.js'
import { BackScene, Timeline } from '../Scenes'
import  ScrollableTabView, { ScrollableTabBar}  from 'react-native-scrollable-tab-view'


const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class CarProfile extends Component {

    constructor () {
        super(...arguments);

        const { car, cars, dispatch } = this.props;
        if((cars.browsingCars.length === 0) || (!cars.browsingCars.find(item => item.carInfo.id === car.carInfo.id ))){
            dispatch(getCarTimelineContent(car.carInfo, 'Images', 0))
            dispatch(getCarTimelineContent(car.carInfo, 'Videos', 0))
        }
    }

    back(navigator) {
        navigator.pop()
    }
    render() {
        const { user, car, cars, carOwner, navigator } = this.props;
        const { image } = car.carInfo;
        const owned = !!cars.userCars.find(userCar => userCar.carInfo.id === car.id);
        return (
            <BackScene onBack={() => this.back(navigator)} title = {car.carInfo.car.make + " " + car.carInfo.car.model}>
                <View style={styles.container}>
                    <View>
                        <FitImage resizeMode={Image.resizeMode.contain} source={{uri:image}} style={styles.photo} />
                        <Info ownerImage={carOwner.profileImage} ownerName={carOwner.name} owned={owned}/>
                    </View>
                    <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar/>}>
                    <Text tabLabel='Overview'>Overview</Text>
                    <Timeline tabLabel='Timeline' {...this.props} />
                    <Gallery tabLabel='Showcase' carImages={cars.carImages} carVideos={cars.carVideos} />
                    <Text tabLabel='Technical Spec'>Technical Spec</Text>
                    
                    </ScrollableTabView>
                </View>
            </BackScene>
        )        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'column'
    },
    photo: {
        height: 150,
        width: 350,
        borderRadius: 5
    },
});