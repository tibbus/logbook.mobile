import React, { Component } from 'react'
import { connect } from '../../Utils/connect';
import { View, Navigator } from 'react-native'
import { Intro, Confirm, Success } from '../Cars/Verify'
import { verifyUserCar } from '../../Actions/user'

const stateToProps = ({ user, cars, loadingStatus }) => ({ user, cars, loadingStatus });

@connect(stateToProps)
export class VerifyCar extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        const { id } = route;
        const { dispatch, cars, rootNav } = this.props;
        const mainNav = this.props.navigator; 
        const userId = this.props.user.id;
        const carInfoId = cars.browsingCars[0].carInfo.id;
        const props = { navigator, userId, carInfoId, loadingStatus: this.props.loadingStatus, mainNav };
        switch (id) {
            case 'verify':
                return (<Intro onVerify={() => navigator.push({ id: 'confirm'})} onVerifyLater={() => this.props.navigator.pop()} />);

            case 'confirm':
                return (<Confirm onConfirm={(userId, carInfoId, verifyDetails) => { dispatch(verifyUserCar(userId, carInfoId, verifyDetails)), navigator.push({ id: 'success' })}} {...props} style={{ flex: 1 }} />);

            case 'success':
                return (<Success viewFeed={() => this.props.navigator.push({id: 'profile'})} {...props} />)

            default:
                return (<Intro onVerify={() => navigator.push({ id: 'intro'})} onVerifyLater={() => this.props.navigator.pop()} {...props} />);
        }
    }

    render() {
        return (
            <Navigator
                style={{ flex: 1 }}
                initialRoute={{ id: 'verify' }}
                renderScene={this.renderScene.bind(this)} />
        )
    }
}