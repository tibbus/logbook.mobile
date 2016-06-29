import React from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { BackScene } from '../Scenes/BackScene'

export const CarDetails = ({
  carInfo,
  onBack
}) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  const source = ds.cloneWithRows(details)

  const renderDetail = ({ key }) => {
    const detail = carInfo[key] || '-'
    return (
      <View style={styles.row}>
        <Text style={styles.detail}>{key}</Text><Text style={styles.detail}>{detail}</Text>
      </View>
    )
  }

  return (
    <BackScene onBack={onBack} style={styles.container} title='Car Details'>
      <ListView
        contentContainerStyle={{ justifyContent: 'center' }}
        dataSource={source}
        renderRow={renderDetail} />
    </BackScene>
  )
}

const details = [{
  key: 'registrationNumber'
}, {
  key: 'colour'
}, {
  key: 'transmission'
}, {
  key: 'cylinderCapacity'
}, {
  key: 'fuelType'
}, {
  key: 'c02Emission'
}, {
  key: 'wheelPlan'
}, {
  key: 'weight'
}, {
  key: 'sixMonthsTaxRate'
}, {
  key: 'twelveMonthTaxRate'
}]

const styles = StyleSheet.create({
  container: {

  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  detail: {
    flex: 1
  }
})
