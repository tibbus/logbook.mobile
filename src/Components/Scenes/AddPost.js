import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View
} from 'react-native'
import { LandingPage } from '../Post/AddPost'
import { updateUserCars } from '../../Actions/user.js'
import { addCarTimelineImage } from '../../Actions/timeline'

const stateToProps = ({ user, cars }) => ({ user, cars });

@connect(stateToProps)
export class AddPost extends Component {

  constructor (props) {
    super(props)

    const {dispatch, cars, user } = this.props;

    if(!cars) {
      dispatch(updateUserCars());
    }
    
  }

  render () {
    const { dispatch } = this.props;
    const props = { navigator: this.props.navigator, cars: this.props.cars, user: this.props.user}
    return (
      <LandingPage {...props} onPostClick={(postDetails) => dispatch(addCarTimelineImage({postDetails}))}/>
    )
  }
}