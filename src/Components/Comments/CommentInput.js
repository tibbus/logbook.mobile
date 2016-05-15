import React, {
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#e0e0e0',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    backgroundColor: '#f0f0f0'
  }
})

export const CommentInput = ({
  onSubmitEditing
}) => (
  <View style={styles.container}>
    <TextInput placeholder='Comment...' style={styles.input}
      onSubmitEditing={onSubmitEditing} />
    <Icon.Button name='plus' onPress={() => console.info('pie')}>Ok</Icon.Button>
  </View>
)

