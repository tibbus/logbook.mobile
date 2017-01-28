import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const BackScene = ({
  children,
  onBack,
  onAction,
  style,
  title,
  actionName = 'Go'
}) => (
  <View style={style}>
    <View style={styles.statusBar}>
      <TouchableHighlight style={[styles.button, { alignItems: 'flex-start', paddingLeft: 10 }]} onPress={onBack}>
        <View style={styles.flexRow}><Icon name='arrow-back' size={20} /></View>
      </TouchableHighlight>
      { title ? <View style={styles.title}><Text>{title}</Text></View> : <View style={styles.title}></View>}
      {onAction ? (
        <TouchableHighlight style={[styles.button, { alignItems: 'flex-end', paddingRight: 10 }]} onPress={onAction}>
          <View style={styles.flexRow}><Text>{actionName}</Text><Icon name='arrow-forward' size={20} /></View>
        </TouchableHighlight>
      ) : <View style={styles.button} />}
    </View>
    {children}
  </View>
)

const styles = StyleSheet.create({
  statusBar: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 40,
    flexDirection: 'row'
  },
  statusInner: {
    flex: 1
  },
  title: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    width: 70,
    paddingTop: 10,
    paddingBottom: 10
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
