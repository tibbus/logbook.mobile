import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import { View, Navigator, Alert, StyleSheet } from 'react-native';

import { RegNoForm } from './RegNoForm';
import { ConfirmationDetails } from './ConfirmationDetails';
import { Success } from './Success';
import { getCar } from '../../Actions/cars';
import { addUserCar } from '../../Actions/user';
import { LoadingView } from '../../Components/LoadingView';

const stateToProps = ({ user, cars, loadingStatus }) => ({ user, cars, loadingStatus });

@connect(stateToProps)
export class AddCar extends Component<any, any> {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    const { id } = route;
    const { dispatch, cars } = this.props;
    const props = { navigator, userId: this.props.user.id, carToConfirm: this.props.cars.carToConfirm, loadingStatus: this.props.loadingStatus, rootNav: this.props.navigator };
    switch (id) {
      case 'addRegNo':
        return (
          <LoadingView style={styles.container}
            isLoading={this.props.loadingStatus.carsLoading}>
            <RegNoForm carRegSubmit={regNo => {
              dispatch(getCar(
                regNo,
                () => navigator.push({ id: 'confirmCar' }),
                () => Alert.alert("Failed!", "No car is registered to the entered registration number!")));
            }} {...props} />
          </LoadingView>
        );

      case 'confirmCar':
        return (
          <LoadingView style={styles.container}
            isLoading={this.props.loadingStatus.addingUserCar}>
            <ConfirmationDetails onConfirm={(userId, carInfoId) => {
              dispatch(addUserCar(
                userId,
                carInfoId,
                () => navigator.push({ id: 'success' }),
                () => { Alert.alert("Failed!", "Failed to add car to garage!"), navigator.pop() }));
            }} {...props} style={{ flex: 1 }} />
          </LoadingView>
        );

      case 'success':
        return (<Success {...props} />)

      default:
        return (
          <LoadingView style={styles.container}
            isLoading={this.props.loadingStatus.carsLoading}>
            <RegNoForm carRegSubmit={regNo => {
              dispatch(getCar(
                regNo,
                () => navigator.push({ id: 'confirmCar' }),
                () => Alert.alert("Failed!", "No car is registered to the entered registration number!")));
            }} {...props} />
          </LoadingView>
        );
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ id: 'addRegNo' }}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
  }
});
