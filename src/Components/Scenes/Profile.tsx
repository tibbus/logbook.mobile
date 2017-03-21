import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'
import { Main } from '../Profile'
import { CarGarage } from '../Cars'
import { updateUserFollowCount, updateUserCars } from '../../Actions/user.js'

const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class Profile extends Component<any, any> {

    constructor () {
        super(...arguments);

        const {dispatch, cars, user } = this.props;

        dispatch(updateUserFollowCount(user.id));
        dispatch(updateUserCars());
    }

    render() {
        const { user, cars, navigator } = this.props;
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                style={[styles.scrollView, styles.horizontalScrollView]}>
                    {<Main user = {user} />}
                    {<CarGarage cars = {cars} user = {user} navigator = {navigator} />}
            </ScrollView>
        )        
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    //allowFontScaling: true
  },
  scrollView: {
    flex: 1,
  },
  horizontalScrollView: {
    height: 200,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10
  }
})