import React, {
  Component,
  Navigator
} from 'react-native'
import {
  MainNav
} from './'
import { SignIn } from './Scenes'
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
    const { dispatch, user } = this.props
    const { token } = user
    const { id = 'main', component, requiresAuth = true } = route
    const routeId = (requiresAuth && (!token || !user.id)) ? null : id

    switch (routeId) {

      case 'main':
        return (<MainNav navigator={navigator} />)

      case 'modal':
        return component

      default:
        return (<SignIn navigator={navigator} user={user} dispatch={dispatch} />)

    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{}}
        configureScene={configureScene}
        renderScene={this.renderScene.bind(this)}
        sceneStyle={{paddingTop: 20}}
       />
    )
  }

}
