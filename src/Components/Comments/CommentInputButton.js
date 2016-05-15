import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

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

export const CommentInputButton = ({
  onPress
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View placeholder='Comment...' style={styles.input}>
      <Text>Comment...</Text>
    </View>
  </TouchableOpacity>
)
