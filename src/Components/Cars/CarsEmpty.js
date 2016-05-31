import React, {
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export const CarsEmpty = ({
  onAddCar
}) => (
  <View>
    <Icon.Button name='plus' onPress={() => onAddCar()}>
      Add a car
    </Icon.Button>
  </View>
)
