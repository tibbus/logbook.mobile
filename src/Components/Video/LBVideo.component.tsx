import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface propTypes {
  uri: string,
  paused?: boolean,
  style?: ViewStyle,
  playable?: boolean
}

export class LBVideo extends Component<propTypes, any> {
  static defaultProps = {
    style: {},
    playable: true
  }

  constructor(props) {
    super(props);

    const style = StyleSheet.flatten(props.style);

    this.state = {
      uri: props.uri,
      paused: props.paused,
      height: style.height,
      width: style.width
    };
  }

  public onVideoPress = () => {
    if (this.props.playable) {
      this.setState({
        paused: !this.state.paused
      });
    }
  }

  public onVideoLoad = event => {
    const style = StyleSheet.flatten(this.props.style);
    const { width, height } = event.naturalSize;
    const ratio = width / height;

    // If the height is not passed it, then fit Height to the Width ratio
    if (!style.height) {
      this.setState({
        height: this.state.width / ratio
      });
    }
  }

  public onLayout = event => {
    this.state.width = event.nativeEvent.layout.width;
  }

  render() {
    const VideoContainer = this.props.playable ? TouchableOpacity : View;

    return (
      <View>
        <VideoContainer activeOpacity={0.9} onPress={this.onVideoPress} onLayout={this.onLayout}>
          <Video
            source={{ uri: this.state.uri }}
            paused={this.state.paused}
            repeat={Boolean(true)}
            onLoad={this.onVideoLoad}
            controls={Boolean(true)}
            style={[this.props.style, { height: this.state.height, width: this.state.width }]} />

          <View style={styles.iconContainer}>{this.state.paused ? (<Icon name='play-circle-filled' style={styles.icon} />) : null}</View>
        </VideoContainer>
      </View>
    );
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
  },
  icon: {
    fontSize: 90,
    color: '#e0e0e0'
  }
});
