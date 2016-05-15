import Icon from 'react-native-vector-icons/FontAwesome'
import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  button: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeButton: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0'
  },
  icon: {
    fontSize: 17
  }
})

export class MainNavBar extends Component {

  goToHome () {
    const { navigator } = this.props
    navigator.push({
      id: 'away'
    })
  }

  render () {
    const { navigator } = this.props
    const routes = navigator.getCurrentRoutes()
    const { length } = routes
    const activeRoute = length ? routes[length - 1].id : 'home'
    const bgColour = route => route === activeRoute ? styles.activeButton : styles.button

    return (
      <View style={styles.container}>
        <TouchableHighlight style={bgColour('home')} onPress={this.goToHome.bind(this)}>
          <Icon name='home' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='search' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='comments' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='globe' style={styles.icon} />
        </TouchableHighlight>
      </View>
    )
  }
}
