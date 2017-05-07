import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View,
  Navigator
} from 'react-native';

import { LandingPage } from './LandingPage';
import { ConfirmPage } from './ConfirmPage';
import { updateUserCars } from '../../Actions/user';
import { addCarTimelinePost } from '../../Actions/timeline';
import { updateAddPost, resetAddPost } from '../../Actions/post';

const stateToProps = ({ user, cars, post }) => ({ user, cars, post });

@connect(stateToProps)
export class AddPost extends Component<any, any> {
  private navigator: any;

  constructor(props) {
    super(props)

    const { dispatch, cars, user } = this.props;
    if (!cars) {
      dispatch(updateUserCars());
    }

  }

  componentWillReceiveProps({ post }) {

    if (post.publishPending === true) {
      this.setState({ postDetails: post.data });
    }

    if (post.publishPending === false && post.published === true) {
      this.props.navigator.push({ id: 'profile' });
    }

    if (post.publishPending === false && post.published === false) {
      this.navigator.push({ id: 'postFailed' });
    }
  }

  renderScene(route, navigator) {
    const { id } = route;
    const { dispatch } = this.props;
    const props = { navigator: navigator, rootNav: this.props.navigator, cars: this.props.cars, user: this.props.user }
    this.navigator = navigator;

    switch (id) {
      case 'composePost':
        return (
          <LandingPage {...props}
            onNextClick={(postDetails) => {
              dispatch(updateAddPost(postDetails))
              navigator.push({ id: 'confirmPost' })
            }} />
        )
      case 'confirmPost':
        const postDetails = { postDetails: this.state.postDetails };
        return (
          <ConfirmPage {...props} {...postDetails}
            onCancelClick={() => {
              dispatch(resetAddPost())
              this.props.navigator.pop()
            }}
            onPostClick={(postDetails) => dispatch(addCarTimelinePost(postDetails))} />
        )
      case 'postSuccess':
        return (
          <View><Text>Success</Text></View>
        )

      case 'postFailed':
        return (
          <View><Text>Failed</Text></View>
        )

      default:
        return (
          <LandingPage {...props}
            onNextClick={(postDetails) => dispatch(updateAddPost(postDetails))} />
        )
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ id: 'composePost' }}
        renderScene={this.renderScene.bind(this)} />)
  }
}