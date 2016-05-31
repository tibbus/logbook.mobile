import React, {
  StyleSheet,
  TextInput,
  View
} from 'react-native'

export const StatusEntry = ({
  onChangeText,
  onSubmitEditing,
  value = ''
}) => (
  <View style={styles.container}>
    <TextInput placeholder='Status...'
      style={styles.input}
      onChangeText={onChangeText}
      multiline={Boolean(true)}
      defaultValue={value}
      autoFocus={Boolean(true)}
      onSubmitEditing={onSubmitEditing} />
  </View>
)

const styles = StyleSheet.create({
  input: {
    borderColor: '#e0e0e0',
    margin: 10,
    padding: 10,
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1
  }
})
