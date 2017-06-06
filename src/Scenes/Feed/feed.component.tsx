import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from '../../Utils/connect';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Timeline } from '../../Components/timeline/timeline.component';

const stateToProps = ({ user }) => ({ user });
@connect(stateToProps)
export class Feed extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Timeline {...this.props} type="user" />
      </KeyboardAwareScrollView>
    );
  }
}