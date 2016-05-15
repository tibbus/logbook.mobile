import React, {
  Component,
  Navigator
} from 'react-native'
import {
  MainNav,
  SignIn
} from './'
import { connect } from 'react-redux'

const configureScene = ({ sceneConfig, id } = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  if (id === 'modal') {
    return Navigator.SceneConfigs.FloatFromBottom
  }

  return Navigator.SceneConfigs.FloatFromRight
}

@connect(({ user }) => ({ user }))
export class RootNav extends Component {

  renderScene (route, navigator) {
    const { user: { token } } = this.props
    const { id = 'main', component } = route
    const routeId = token ? id : null

    switch (routeId) {

      case 'main':
        return (<MainNav navigator={navigator} />)

      case 'modal':
        return component

      default:
        return (<SignIn navigator={navigator} />)

    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{}}
        configureScene={configureScene}
        renderScene={this.renderScene.bind(this)}
       />
    )
  }

}
