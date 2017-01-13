import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Main } from '../Profile'
import { CarGarage } from '../Cars'
import { updateUserFollowCount, updateUserCars } from '../../Actions/user.js'

const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class Profile extends Component {

    constructor () {
        super(...arguments);

        const {dispatch, cars, user } = this.props;

        dispatch(updateUserFollowCount(user.id));
        dispatch(updateUserCars());
    }

    render() {
        const { user, cars } = this.props;
        return (
            <View>
                <Main user = {user} />
                <CarGarage cars = {cars} />
            </View>
        )        
    }
}