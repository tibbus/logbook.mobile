import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { MainNav } from './';
import { SignIn } from './Scenes';
import { connect } from '../Utils/connect';

const configureScene = ({ sceneConfig, id }: any = {}) => {
  if (sceneConfig) {
    return sceneConfig
  } else if (id === 'modal') {
    return Navigator.SceneConfigs.FloatFromBottom
  }

  return Navigator.SceneConfigs.FloatFromRight
}

@connect(({ user }) => ({ user }))
export class RootNav extends Component<any, any> {

  renderScene(route, navigator) {
    const { dispatch, user } = this.props;
    const routeId: string =  user.token || user.id ? 'main' : 'auth';

    if (routeId === 'main') {
      return <MainNav navigator={navigator} />;
    }

    return <SignIn navigator={navigator} user={user} dispatch={dispatch} />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{}}
        configureScene={configureScene}
        renderScene={this.renderScene.bind(this)}
        sceneStyle={{ paddingTop: 20 }}
      />
    )
  }

}
