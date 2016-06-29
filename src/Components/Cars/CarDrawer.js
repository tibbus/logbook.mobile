import React from 'react'
import {
  StyleSheet
} from 'react-native'
import Drawer from 'react-native-drawer'
import { CarDetails, CarMenu, CarMOTHistory } from './'
import { Timeline } from '../Scenes/Timeline'

export const CarDrawer = ({
  car,
  dispatch,
  rootNav,
  user
}) => {
  const { carInfo, mot } = car
  const onBack = () => rootNav.pop()

  let drawer

  const getActionComponent = selected => {
    const { value } = selected
    const props = { carInfo, onBack }

    switch (value) {
      case 'mot':
        return (<CarMOTHistory onBack={onBack} mot={mot} />)

      default:
        return (<CarDetails {...props} />)
    }
  }

  const takeAction = selected => {
    drawer.close()
    const component = getActionComponent(selected)
    rootNav
     .push({
       component,
       id: 'modal'
     })
  }

  return (
    <Drawer
      ref={reference => { drawer = reference }}
      content={<CarMenu onSelect={takeAction} />}
      type='static'
      side='right'
      panOpenMask={0.2}
      openDrawerOffset={100}
      styles={drawerStyles}
      negotiatePan={Boolean(true)}
      tweenHandler={Drawer.tweenPresets.parallax}>
      <Timeline car={car} rootNav={rootNav} user={user} />
    </Drawer>
  )
}

const drawerStyles = StyleSheet.create({

})
