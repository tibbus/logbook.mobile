import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import getStream from 'getstream';

export const CarNavBar = (props) => {
  const {
    cars,
    navigator
  } = props
  const routes = navigator.getCurrentRoutes()
  const currentIndex = routes.length - 1
  const Car = cars[currentIndex]
  const { carInfo = {} } = Car
  const { car = {} } = carInfo
  const { make, model } = car

  const next = () => {
    if (currentIndex < cars.length - 1) {
      navigator.push({
        id: 'next',
        index: currentIndex + 1
      })
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      navigator.pop()
    }
  }
  console.log('---------------------------------------------------------------')
  console.log(getStream);
  return (
    <View style={styles.container}>
      <TouchableHighlight style={[styles.navItem, styles.button]} onPress={() => prev()}>
        <Icon name='chevron-left' style={styles.icon} />
      </TouchableHighlight>
      <View style={[styles.navItem, styles.title]}>
        <Text>{make} {model}</Text>
      </View>
      <TouchableHighlight style={[styles.navItem, styles.button]} onPress={() => next()}>
        <Icon name='chevron-right' style={styles.icon} />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9e9e9',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    right: 0,
    top: 0,
    height: 40,
    left: 0
  },
  button: {
    width: 50
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    flex: 1
  }
})
