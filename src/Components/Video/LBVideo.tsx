import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/MaterialIcons'

export class LBVideo extends Component<any,any> {
  
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    uri: PropTypes.string.isRequired,
    paused: PropTypes.bool,
    style: Video.propTypes.style
  }

  constructor(props) {
    super(props)

    this.state = {
      uri: props.uri,
      paused: props.paused,
      height: (props.height) ? props.height : 170,
      width: (props.width) ? props.width : 120
    }
  }

  render() {
    const { uri } = this.state
    return (
      <View>
        <TouchableOpacity onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video
            source={{uri}}
            resizeMode='contain'
            paused={this.state.paused}
            repeat={Boolean(true)}
            controls={Boolean(true)}
            style={{ height: this.state.height, width: this.state.width }} />

          <View style={styles.iconContainer}>{this.state.paused ? (<Icon name='play-circle-filled' style={styles.icon} />) : null}</View>
        </TouchableOpacity>
      </View>
    )
  }
}

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
  } as React.ViewStyle,
  icon: {
    fontSize: 90,
    color: '#e0e0e0',
    backgroundColor: 0
  }
})


