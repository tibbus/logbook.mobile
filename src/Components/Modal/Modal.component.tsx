import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, ViewStyle, Image, ModalProperties  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from './Modal.styles';
import { getNativeProps } from '../../Utils';

interface Proptypes extends ModalProperties {
  content: React.ReactNode,
  style?: ViewStyle
}

export class LBModal extends Component<Proptypes, any> {
  static defaultProps = {
    animationType: 'slide'
  }

  state = {
    modalVisible: false
  }

  public pressOpen = () => {
    this.setState({ modalVisible: true });
  }

  public pressClose = () => {
    this.setState({ modalVisible: false });
  }

  public getModalProps() {
    return getNativeProps(this.props, ['content', 'style']);
  }

  render() {
    return (
      <View>
        <Modal {...this.getModalProps() } visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={this.pressClose}>
              <Icon name="md-close" style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
              {this.props.content}
            </View>
          </View>
        </Modal>

        <TouchableOpacity activeOpacity={0.9} onPress={this.pressOpen}>
          <View style={this.props.style}>
            {this.props.children}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
