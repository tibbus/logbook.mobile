import React, {
  Component,
  Navigator
} from 'react-native'
import { Home, MainNavBar, TimelineForm } from './'

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

      case 'timeline:create':
        return (<TimelineForm />)

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
