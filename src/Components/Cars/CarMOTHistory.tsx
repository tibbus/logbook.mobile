import React from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { BackScene } from '../Scenes/BackScene'
import { is, isNil, length, pick } from 'ramda'
import moment from 'moment'

const renderRow = (val: any = '', e, key) => {
  const valLength = length(val)
  if (is(Array, val) && valLength) {
    return (
      <View style={styles.items}>
        <Text>{key}</Text>
        {val.map(item => (
          <Text key={item} style={styles.item}>{item}</Text>
        ))}
      </View>
    )
  }

  const text = is(Number, val) || valLength ? val : '-'
  return (
    <View style={styles.row}>
      <Text style={styles.detail}>{key}</Text>
      <Text style={styles.detail}>{text}</Text>
    </View>
  )
}
const mapMOT = mot => {
  return pick([
    'testNumber',
    'expiryDate',
    'odoMeterReading',
    'advisoryItems',
    'failedItems'
  ])(mot)
}
export const CarMOTHistory = ({
  carInfo,
  mot = [],
  onBack
}) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  })
  const source = ds.cloneWithRowsAndSections(mot.map(mapMOT))

  const renderHeader = (data, ind) => {
    const motDetails = mot[ind]
    const { expiryDate, testDate } = motDetails
    const dateStr = moment(testDate).format('Mo MMMM YYYY')
    const style = isNil(expiryDate) ? styles.failed : styles.passed
    return (
      <View style={[ styles.sectionHeader, style ]}>
        <Text>Test Date: {dateStr}</Text>
      </View>
    )
  }

  const viewContents = () => {
    if (length(mot) === 0) {
      return (<Text>MOT History Not Found</Text>)
    }

    return (
      <ListView
        contentContainerStyle={{ justifyContent: 'center' }}
        dataSource={source}
        renderSectionHeader={renderHeader}
        renderRow={renderRow} />
    )
  }

  return (
    <BackScene onBack={onBack} style={styles.container} title='MOT History'>
      {viewContents()}
    </BackScene>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  } as any,
  item: {
    fontSize: 10
  },
  passed: {
    backgroundColor: 'green'
  },
  failed: {
    backgroundColor: 'red'
  },
  items: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  } as React.ViewStyle,
  detail: {
    flex: 1
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    padding: 10
  }
})
