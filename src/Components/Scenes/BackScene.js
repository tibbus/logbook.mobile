import React, {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  statusBar: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height: 40,
    flexDirection: 'row'
  },
  statusInner: {
    flex: 1
  }
})

export const actionButton = ({
  onAction
}) => {
  if (onAction) {

  } else {

  }
}

export const BackScene = ({
  children,
  onBack,
  style,
  title = 'title'
}) => (
  <View style={style}>
    <View style={styles.statusBar}>
      <Icon.Button name='chevron-left' onPress={onBack} style={styles.statusInner}>Back</Icon.Button>
      <Text style={styles.statusInner}>{title}</Text>
    </View>
    {children}
  </View>
)
