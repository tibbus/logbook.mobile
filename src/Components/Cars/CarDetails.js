import React, {
  StyleSheet
} from 'react-native'
import { BackScene } from '../Scenes/BackScene'

// const details = [{
//   key: 'registrationNumber'
// }]

export const CarDetails = ({
  carInfo,
  onBack
}) => {
  console.info(carInfo)
  return (
    <BackScene onBack={onBack} style={styles.container} title='Car Details' />
  )
}

const styles = StyleSheet.create({
  container: {

  }
})
