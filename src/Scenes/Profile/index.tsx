import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import { ScrollView, StyleSheet } from 'react-native';

import { Main } from './Main';
import { CarGarage } from './CarGarage';
import { updateUserFollowCount, updateUserCars } from '../../Actions/user.js'

const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class Profile extends Component<any, any> {
  constructor(props) {
    super(props);

    const { dispatch, cars, user } = this.props;

    dispatch(updateUserFollowCount(user.id));
    dispatch(updateUserCars(user.id));
  }

  render() {
    const { user, cars, navigator } = this.props;
    return (
      <ScrollView style={styles.scrollView}>
        {<Main user={user} />}
        {<CarGarage cars={cars} user={user} navigator={navigator} />}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    //allowFontScaling: true
  },
  scrollView: {
    flex: 1,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10
  }
});