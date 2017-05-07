import React, { Component } from 'react';
import { Navigator } from 'react-native';

import { MainNav } from './MainNav';
import { SignIn } from '../'
import { connect } from '../../Utils/connect';

const configureScene = ({ sceneConfig, id }: any = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  if (id === 'modal') {
    return Navigator.SceneConfigs.FloatFromBottom
  }

  return Navigator.SceneConfigs.FloatFromRight
}

@connect(({ user }) => ({ user }))
export class RootNav extends Component<any, any> {

  renderScene(route, navigator) {
    const { dispatch, user } = this.props;
    const routeId: string = !user.token || !user.id ? null : 'main';

    switch (routeId) {
      case 'main':
        return (<MainNav navigator={navigator} />);
      default:
        return (<SignIn navigator={navigator} user={user} dispatch={dispatch} />);
    }
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
