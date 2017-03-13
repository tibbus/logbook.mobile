import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Info, Gallery } from '../Cars/Profile'
import { FitImage } from '../Image'
import { getCarById, setBrowsingCar, getCarTimelineContent, followCar, unFollowCar } from '../../Actions/cars.js'
import { getUserFollowingFeeds } from '../../Actions/user.js'
import { BackScene, Timeline } from '../Scenes'
import  ScrollableTabView, { ScrollableTabBar}  from 'react-native-scrollable-tab-view'


const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class CarProfile extends Component {

    constructor () {
        super(...arguments);

        const { car, carInfoId, cars, user, dispatch } = this.props;
        if(car && !cars.browsingCars.find(item => item.carInfo.id === car.carInfo.id )){
            dispatch(setBrowsingCar(car.carInfo));
        }
        else {
            dispatch(getCarById(carInfoId));
        }
        
        if(user.follows.length === 0) {
            dispatch(getUserFollowingFeeds(user.id))
        }
    }

    componentWillReceiveProps({ cars }) {
        
        const { dispatch, car, carInfoId } = this.props;
        let browsingCarId = 0;
        car ? browsingCarId = car.carInfoId.id : browsingCarId = carInfoId;
        browsingCar = cars.browsingCars.find(item => item.carInfo.id === browsingCarId);

        if(browsingCar.carImages.loadPending) {
            dispatch(getCarTimelineContent(browsingCarId, 'Images', 0));
        }
        if(browsingCar.carVideos.loadPending) {
            dispatch(getCarTimelineContent(browsingCarId, 'Videos', 0));
        }
    }

    back(navigator) {
        navigator.pop()
    }
    render() {
        const { user, car, carInfoId, cars, carOwner, navigator, dispatch, rootNav } = this.props;

        let browsingCar;
        if(car) {
            browsingCar = cars.browsingCars.find(item => item.carinfo.id === car.id)

            if(!browsingCar){
                return (
                    <View>
                        <Text>Loading</Text>
                    </View>
                );
            }
        }
        else {
            browsingCar = cars.browsingCars.find(item => item.carInfo.id === carInfoId)

            if(!browsingCar){
                return (
                    <View>
                        <Text>Loading</Text>
                    </View>
                );
            }
        }
        const { image } = browsingCar.carInfo;
        const owned = !!cars.userCars.find(userCar => userCar.carInfo.id === browsingCar.carInfo.id);
        const followed = user.follows.includes(browsingCar.carInfo.id)
        const timelineProps = { car:browsingCar, user, navigator, dispatch, rootNav}
        return (
            <BackScene onBack={() => this.back(navigator)} title = {browsingCar.carInfo.car.make + " " + browsingCar.carInfo.car.model}>
                <View style={styles.container}>
                    <View>
                        <FitImage resizeMode={Image.resizeMode.contain} source={{uri:image}} style={styles.photo} />
                        <Info ownerImage={''} 
                        ownerName={''} 
                        owned={owned}
                        onSettingsPress={() => console.log("Settings")}
                        followed = {followed}
                        onFollowPress={() => followCar(user.id, browsingCar.carInfo.id)}
                        onUnFollowPress={() => unFollowCar(user.id, browsingCar.carInfo.id)}/>

                    </View>
                    <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar/>}>
                    <Text tabLabel='Overview'>Overview</Text>
                    <Timeline tabLabel='Timeline' {...timelineProps} />
                    <Gallery tabLabel='Showcase' carImages={browsingCar.carImages.content} carVideos={browsingCar.carVideos.content} />
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