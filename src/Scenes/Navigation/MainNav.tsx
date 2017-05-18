import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';

import { MainNavBar } from './MainNavBar'
import { Search, Profile, AddCar, CarProfile, AddPost, Feed, VerifyCar } from '../';

const configureScene = ({ sceneConfig }: any = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  return Navigator.SceneConfigs.FloatFromRight
}

export class MainNav extends Component<any, any> {

  renderScene(route, navigator) {
    const { id } = route
    const props = { navigator, rootNav: this.props.navigator }
    switch (id) {
      case 'home':
        return (<Feed {...props} style={{ flex: 1 }} />)

      case 'search':
        return (<Search {...props} style={{ flex: 1 }} />)

      case 'profile':
        return (<Profile {...props} style={{ flex: 1 }} />)

      case 'addPost':
        return (<AddPost {...props} style={{ flex: 1 }} />)

      case 'addCar':
        return (<AddCar {...props} style={{ flex: 1 }} />)

      case 'car':
        return (<CarProfile {...props} {...route.passProps} style={{ flex: 1 }} />);

      case 'verify':
        return (<VerifyCar {...props} style={{ flex: 1 }} />)

      default:
        return (<Profile {...props} style={{ flex: 1 }} />)
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'profile' }}
        navigationBar={<MainNavBar />}
        configureScene={configureScene}
        sceneStyles={{ flex: 1 }}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

}
