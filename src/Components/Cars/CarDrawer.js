import React, {
  StyleSheet
} from 'react-native'
import Drawer from 'react-native-drawer'
import { CarDetails, CarMenu } from './'
import { Timeline } from '../Scenes/Timeline'

export const CarDrawer = ({
  car,
  dispatch,
  rootNav
}) => {
  const { carInfo } = car
  const onBack = () => rootNav.pop()

  let drawer

  const takeAction = (selected) => {
    const { value } = selected
    const props = { carInfo, onBack }
    drawer.close()

    switch (value) {
      default:
        return rootNav
          .push({
            component: (<CarDetails {...props} />),
            id: 'modal'
          })
    }
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
      <Timeline car={car} rootNav={rootNav} />
    </Drawer>
  )
}

const drawerStyles = StyleSheet.create({

})
