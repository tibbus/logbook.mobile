import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

export class SquareImage extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null
    };
  }

  public setImageSize(event) {
    const { width, height } = event.nativeEvent.layout;

    if (this.props.resizeToHeight) {
      this.setState({
        width: height,
        height: height
      });
    } else {
      this.setState({
        width: width,
        height: width
      });
    }
  }

  public getStyle() {
    return {
      width: this.state.width,
      height: this.state.height,
      borderRadius: this.state.width / 2
    };
  }

  render() {
    return (
      <Image source={this.props.source}
        style={[this.getStyle(), this.props.style]}
        onLayout={event => this.setImageSize(event)}
      />
    );
  }
}
