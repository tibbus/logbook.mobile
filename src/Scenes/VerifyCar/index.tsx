import React, { Component } from 'react'
import { connect } from '../../Utils/connect';
import { View, Alert, StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import { Intro } from './Intro';
import { Confirm } from './Confirm';
import { Success } from './Success';
import { verifyUserCar } from '../../Actions/user';
import { LoadingView } from '../../Components/LoadingView';

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
        return (<Intro onVerify={() => navigator.push({ id: 'confirm' })} onVerifyLater={() => this.props.navigator.pop()} />);

      case 'confirm':
        return (
          <LoadingView style={styles.container}
            isLoading={this.props.loadingStatus.verifyingUserCar}>
            <Confirm onConfirm={(userId, carInfoId, verifyDetails) => {
              dispatch(verifyUserCar(
                userId,
                carInfoId,
                verifyDetails,
                () => navigator.push({ id: 'success' }),
                () => Alert.alert("Failed!", "Car verification failed!"))
              )
            }} {...props} style={{ flex: 1 }} />
          </LoadingView>
        );

      case 'success':
        return (<Success viewFeed={() => this.props.navigator.push({ id: 'profile' })} {...props} />)

      default:
        return (<Intro onVerify={() => navigator.push({ id: 'intro' })} onVerifyLater={() => this.props.navigator.pop()} {...props} />);
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ id: 'verify' }}
        renderScene={this.renderScene.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
  }
});
