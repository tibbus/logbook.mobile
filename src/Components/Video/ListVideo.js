import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const ListVideo = ({
  onVideoPress,
  paused,
  uri
}) => (
  <TouchableOpacity onPress={onVideoPress} style={styles.button}>
    <View>
      <Video
        source={{uri}}
        resizeMode='contain'
        paused={paused}
        repeat={Boolean(true)}
        controls={Boolean(true)}
        style={{ height: 200 }} />

      <View style={styles.iconContainer}>{paused ? (<Icon name='play-circle-filled' style={styles.icon} />) : null}</View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 90,
    color: '#e0e0e0',
    backgroundColor: 0
  }
})
