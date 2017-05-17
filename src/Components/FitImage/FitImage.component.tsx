import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

export class FitImage extends Component<any, any> {
  private ratio;

  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null
    };
  }

  componentDidMount() {
    Image.getSize(this.props.source, (width, height) => {
      this.ratio = width / height;
      this.renderImage();
    });
  }

  public setSizes(event) {
    const { width, height } = event.nativeEvent.layout;
    this.state.width = width;
    this.state.height = height;

    this.renderImage();
  }

  public renderImage() {
    // Wait for both layout event and image.getSize to finish before render it
    if (!this.state.width || !this.ratio) {
      return;
    }

    if (this.props.round) {
      this.setState({
        width: this.state.width,
        height: this.state.width
      });
    } else if (this.props.fitToWidth) {
      this.setState({
        width: this.state.width,
        height: this.state.width / this.ratio
      });
    }
  }

  public getStyle() {
    return {
      width: this.state.width,
      height: this.state.height,
      borderRadius: this.props.round ? this.state.width / 2 : 0
    };
  }

  render() {
    return (
      <Image source={this.props.source}
        style={[this.getStyle(), this.props.style]}
        onLayout={event => this.setSizes(event)}
      />
    );
  };
}
