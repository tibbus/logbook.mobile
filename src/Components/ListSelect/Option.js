import React, {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'

export const Option = (option) => {
  const {
    description,
    onSelect
  } = option
  return (
    <TouchableHighlight style={styles.menuOption} underlayColor='#eaeaea' onPress={() => onSelect(option)}>
      <Text>{description}</Text>
    </TouchableHighlight>
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
  }
})
