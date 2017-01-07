import Icon from 'react-native-vector-icons/FontAwesome'
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import colours from '../Utils/colours'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colours.background,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: colours.line,
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
    backgroundColor: colours.backgroundBlue,
  },
  icon: {
    fontSize: 20,
  }
})

export class MainNavBar extends Component {

  goToHome () {
    const { navigator } = this.props
    navigator.push({
      id: 'home'
    })
  }

  gotoSearch () {
    const { navigator } = this.props
    navigator.push({
      id: 'search'
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
<<<<<<< HEAD
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='bell-o' style={styles.icon} />
=======
        <TouchableHighlight style={bgColour('search')} onPress={this.gotoSearch.bind(this)}>
          <Icon name='search' style={styles.icon} />
>>>>>>> 566b7ee0d75d44d33684d58a2add5a9afdf22d24
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='plus-square-o' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='search' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away')} onPress={this.goToHome}>
          <Icon name='user' style={styles.icon} />
        </TouchableHighlight>

      </View>
    )
  }
}
