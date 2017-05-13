import React, { Component, PropTypes } from 'react'
import {
  Image,
  Dimensions
} from 'react-native'
var Lightbox = require('react-native-lightbox');

let WINDOW_WIDTH = Dimensions.get('window').width;

export class FitImage extends Component<any, any> {
  // @TODO check if this will work
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    originalHeight: PropTypes.number,
    originalWidth: PropTypes.number,
    source: PropTypes.object.isRequired,
    style: Image.propTypes.style,
    circle: PropTypes.bool
  }

  private isMount: boolean;
  private isFullScreen: boolean;

  constructor(props) {
    super(props)

    const size = [props.width, props.height]
    const originalSize = [props.originalWidth, props.originalHeight]

    if (size.filter(e => e).length === 1) {
      throw new Error('Props error: size props must be present ' +
        'none or both of width and height.')
    }

    if (originalSize.filter(e => e).length === 1) {
      throw new Error('Props error: originalSize props must be present ' +
        'none or both of originalWidth and originalHeight.')
    }

    this.state = {
      height: 0,
      layoutWidth: undefined,
      originalWidth: undefined,
      originalHeight: undefined,
    }
  }

  componentDidMount() {
  this.isMount = true;
    if (!this.props.originalWidth || !this.props.originalHeight) {
      Image.getSize(this.props.source.uri, (width, height) => {
        // Image.getResize async event doesn't have a way to clear it, so if the component is not mounted exit
        if (!this.isMount) {
          return;
        }

        const newHeight = this.state.layoutWidth / width;
        this.setState({
          height: newHeight,
          originalWidth: width,
          originalHeight: height
        })
      })
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  getStyle() {
    if (this.props.width) {
      return { width: this.props.width }
    }
    return { flex: 1 }
  }

  getOriginalWidth() {
    return this.props.originalWidth || this.state.originalWidth
  }

  getOriginalHeight() {
    return this.props.originalHeight || this.state.originalHeight
  }

  getRatio(width) {
    const layoutWidth = width || this.state.layoutWidth

    return layoutWidth / this.getOriginalWidth()
  }

  getHeight(layoutWidth) {
    if (this.props.height) {
      return this.props.height
    }
    return this.getOriginalHeight() * this.getRatio(layoutWidth)
  }

  resize(event) {
    const width  = (this.isFullScreen === true) ? WINDOW_WIDTH : event.nativeEvent.layout.width;
    const height = this.getHeight(width)

    this.setState({
      height,
      layoutWidth: width
    })
  }

  render() {
    return (
      <Lightbox onOpen={() => {this.isFullScreen = true;}} onClose={() => {this.isFullScreen = false}}>
        <Image
          source={this.props.source}
          style={[
            { height: this.state.height },
            { width: this.props.style },
            this.getStyle()
          ]}
          resizeMode='contain'
          onLayout={(event) => this.resize(event)}
        />
      </Lightbox>
    )
  }
}
