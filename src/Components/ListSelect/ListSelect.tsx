import React from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  View,
  TextStyle
} from 'react-native'
import { Option } from './Option'

const getSection = (sections, sectionId) => sections.find(({ section }) => section === sectionId)

const SectionHeader = header => {
  const {
    description
  } = header

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderDescription}>{description}</Text>
    </View>
  )
}

export const ListSelect = ({
  onSelect,
  options
}) => {
  const sections = options.map(({ section }) => section)
  const rows = options.map(({ options }) => options.map((val, ind) => ind))
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    getRowData: (opts, sectionId, rowId) => {
      const section = getSection(opts, sectionId)
      return section.options[rowId]
    },
    getSectionHeaderData: (opts, sectionId) => getSection(opts, sectionId).header
  })

  return (
    <ListView
      style={styles.container}
      contentContainerStyle={{ justifyContent: 'center' }}
      dataSource={ds.cloneWithRowsAndSections(options, sections, rows)}
      renderSectionHeader={SectionHeader}
      enableEmptySections={Boolean(true)}
      renderRow={data => <Option {...data} onSelect={onSelect} />} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  menuOption: {
    padding: 15
  },
  sectionHeader: {
    padding: 15,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#aaa'
  },
  sectionHeaderDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666'
  } as TextStyle
})
