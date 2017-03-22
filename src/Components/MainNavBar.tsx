import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
//importing styles
import background from '../Themes/background';
import navBar from '../Themes/navBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: background.component,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: navBar.line,
  } as React.ViewStyle,
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
    backgroundColor: background.color,
  },
  icon: {
    fontSize: 20,
  }
})

export class MainNavBar extends Component<any, any> {

  goToHome() {
    const { navigator } = this.props
    navigator.push({
      id: 'home'
    })
  }

  gotoSearch() {
    const { navigator } = this.props
    navigator.push({
      id: 'search'
    })
  }

  gotoProfile() {
    const { navigator } = this.props
    navigator.push({
      id: 'profile'
    })
  }

  gotoAddPost() {
    const { navigator } = this.props
    navigator.push({
      id: 'addPost'
    })
  }

  render() {
    const { navigator } = this.props
    const routes = navigator.getCurrentRoutes()
    const { length } = routes
    const activeRoute = length ? routes[length - 1].id : 'home'
    const bgColour = route => route === activeRoute ? styles.activeButton : styles.button

    return (
      <View style={styles.container}>
        <TouchableHighlight style={bgColour('home') as React.ViewStyle} onPress={this.goToHome.bind(this)}>
          <Icon name='home' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away') as React.ViewStyle}>
          <Icon name='bell-o' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('away') as React.ViewStyle}>
          <Icon name='plus-square-o' style={styles.icon} onPress={this.gotoAddPost.bind(this)} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('search') as React.ViewStyle} onPress={this.gotoSearch.bind(this)}>
          <Icon name='search' style={styles.icon} />
        </TouchableHighlight>
        <TouchableHighlight style={bgColour('profile') as React.ViewStyle} onPress={this.gotoProfile.bind(this)}>
          <Icon name='user' style={styles.icon} />
        </TouchableHighlight>
      </View>
    )
  }
}
