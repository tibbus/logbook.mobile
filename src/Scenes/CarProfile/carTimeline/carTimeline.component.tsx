import React, { Component } from 'react';
import { View } from 'react-native';

import { Timeline } from '../../../Components/timeline/timeline.component';

export class CarTimeline extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Timeline {...this.props.timelineProps} />
      </View>
    );
  }
}
