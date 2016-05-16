import React, {
  Component,
  Navigator
} from 'react-native'
import { MainNavBar } from './'
import { Home } from './Scenes'
import { CarForm } from './Cars'

const configureScene = ({ sceneConfig } = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  return Navigator.SceneConfigs.FloatFromRight
}

export class MainNav extends Component {

  renderScene (route, navigator) {
    const { id } = route
    const props = { navigator, parentNav: this.props.navigator }
    switch (id) {
      case 'home':
        return (<Home {...props} />)

      case 'car:create':
        return (<CarForm />)

      default:
        return (<Home {...props} />)
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{ id: 'home' }}
        navigationBar={<MainNavBar />}
        configureScene={configureScene}
        renderScene={this.renderScene.bind(this)}
       />
    )
  }

}
