import React, { Component } from 'react'
import { Navigator } from 'react-native'
import { CarsNav, MainNavBar } from './'

const configureScene = ({ sceneConfig } = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  return Navigator.SceneConfigs.FloatFromRight
}

export class MainNav extends Component {

  renderScene (route, navigator) {
    const { id } = route
    const props = { navigator, rootNav: this.props.navigator }
    switch (id) {
      case 'home':
        return (<CarsNav {...props} style={{flex: 1}} />)

      default:
        return (<CarsNav {...props} style={{flex: 1}} />)
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{ id: 'home' }}
        navigationBar={<MainNavBar />}
        configureScene={configureScene}
        sceneStyles={{flex: 1}}
        renderScene={this.renderScene.bind(this)}
       />
    )
  }

}
