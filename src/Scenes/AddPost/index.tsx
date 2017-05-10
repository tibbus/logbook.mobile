import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View,
  Navigator,
  Alert
} from 'react-native';

import { LandingPage } from './LandingPage';
import { ConfirmPage } from './ConfirmPage';
import { updateUserCars } from '../../Actions/user';
import { addCarTimelinePost } from '../../Actions/timeline';
import { updateAddPost, resetAddPost } from '../../Actions/post';
import { LoadingView } from '../../Components/LoadingView';

const stateToProps = ({ user, cars, post, loadingStatus }) => ({ user, cars, post, loadingStatus });

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

  renderScene(route, navigator) {
    const { id } = route;
    const { dispatch } = this.props;
    const rootNav = this.props.navigator;
    const props = { navigator: navigator, rootNav: rootNav, cars: this.props.cars, user: this.props.user }
    this.navigator = navigator;

    switch (id) {
      case 'composePost':
        return (
          <LoadingView style={styles.container}
          isLoading={this.props.loadingStatus.addPostLoading}>
            <LandingPage {...props}
              onPostClick={(postDetails) => {
                //dispatch(updateAddPost(postDetails, () => navigator.push({ id: 'confirmPost' })))
                dispatch(addCarTimelinePost(
                  postDetails,
                  () => rootNav.push({ id: 'home' }),
                  () => Alert.alert("Failed!", "Could not add post to car timeline!")))
              }} />
          </LoadingView>
        )
      case 'confirmPost':
        const postDetails = { postDetails: this.props.post.data };
        return (
          <LoadingView style={styles.container}
          isLoading={this.props.loadingStatus.addPostLoading}>
            <ConfirmPage {...props} {...postDetails}
              onCancelClick={() => { dispatch(resetAddPost(() => this.props.navigator.pop()))}}
              onPostClick={(postDetails) => dispatch(addCarTimelinePost(
                postDetails,
                () => rootNav.push({ id: 'home' }),
                () => Alert.alert("Failed!", "Could not add post to car timeline!")))} />
          </LoadingView>
        )

      default:
        return (
          <LoadingView style={styles.container}
          isLoading={this.props.loadingStatus.addPostLoading}>
            <LandingPage {...props}
              onNextClick={(postDetails) => {
                dispatch(addCarTimelinePost(
                  postDetails,
                  () => rootNav.push({ id: 'home' }),
                  () => Alert.alert("Failed!", "Could not add post to car timeline!")))
              }} />
          </LoadingView>
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

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});