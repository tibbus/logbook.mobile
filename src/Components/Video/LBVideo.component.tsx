import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

import { LBVideoProps } from './LBVideo.props';
import { styles } from './LBVideo.styles';
import { getNativeProps } from '../../Utils/';

export class LBVideo extends Component<LBVideoProps, any> {
  static defaultProps = {
    style: {},
    playable: true,
    resizeMode: 'cover',
    repeat: true
  }

  private maxHeight

  constructor(props) {
    super(props);

    const style = StyleSheet.flatten(props.style);
    this.maxHeight = style.maxHeight || Dimensions.get('window').height - 120;

    this.state = {
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
      const heightToRatio = width < height ? this.state.width / ratio : this.state.width * ratio;
      const newHeight = heightToRatio > this.maxHeight ? this.maxHeight : heightToRatio;

      this.setState({
        height: newHeight
      });
    }

    // onLoad event middleware
    if (this.props.onLoad) {
      this.props.onLoad(event);
    }
  }

  public onLayout = event => {
    const style = StyleSheet.flatten(this.props.style);
    if (!style.width) {
      this.state.width = event.nativeEvent.layout.width;
    }
  }

  public renderPlayButton() {
    if (!this.state.paused) {
      return null;
    }

    if (this.props.playIcon) {
      return this.props.playIcon;
    } else {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}></View>
          <Icon name='play-arrow' style={styles.icon} />
        </View>
      );
    }
  }

  public getVideoProps() {
    return getNativeProps(this.props, ['source', 'paused', 'onLoad', 'style']);
  }

  render() {
    const VideoContainer = this.props.playable ? TouchableOpacity : View;

    return (
      <VideoContainer activeOpacity={0.9}
        onPress={this.onVideoPress}
        onLayout={this.onLayout}
        style={[this.props.style, { height: this.state.height, width: this.state.width }]}
      >
        <Video {...this.getVideoProps() }
          source={this.props.source}
          paused={this.state.paused}
          onLoad={this.onVideoLoad}
          style={{ height: this.state.height, width: this.state.width }} />

        {this.renderPlayButton()}
      </VideoContainer>
    );
  }
}
