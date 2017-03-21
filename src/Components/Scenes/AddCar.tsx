import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Navigator } from 'react-native'
import { RegNoForm, ConfirmationDetails, Success } from '../Cars/AddCar'
import { getCar } from '../../Actions/cars.js'
import { addUserCar } from '../../Actions/user.js'

const stateToProps = ({ user, cars, loadingStatus }) => ({ user, cars, loadingStatus });

@connect(stateToProps)
export class AddCar extends Component {

    constructor () {
        super(...arguments);
    }

    renderScene (route, navigator) {
        const { id } = route;
        const { dispatch, cars } = this.props;
        const props = { navigator, userId: this.props.user.id, carToConfirm:this.props.cars.carToConfirm, loadingStatus: this.props.loadingStatus };
        switch (id) {
        case 'addRegNo':
            return (<RegNoForm carRegSubmit = {regNo => {
                dispatch(getCar(regNo));
                navigator.push({id: 'confirmCar'});
            }} {...props}/>);
        
        case 'confirmCar':
            return (<ConfirmationDetails onConfirm={(userId, carInfoId) => {
                dispatch(addUserCar(userId, carInfoId));
                navigator.push({id: 'success'});
            }} {...props} style={{flex: 1}} />);

        case 'success':
            return (<Success {...props}/>)

        default:
            return (<RegNoForm carRegSubmit = {regNo => {
                dispatch(getCar(regNo));
                navigator.push({id: 'confirmCar'});
            }} {...props}/>);
        }
    }

    render() {
        return (
            <Navigator
                style={{ flex:1 }}
                initialRoute={{ id: 'addRegNo' }}
                renderScene={ this.renderScene.bind(this) } />
        )       
    }
}