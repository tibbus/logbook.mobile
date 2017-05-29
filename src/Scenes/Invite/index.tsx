import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import {  View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import { RequestForm } from './requestForm/requestForm.component';
import { RequestView } from './requestView/requestView.component';
import { StatusView } from './statusview/statusview.component';

const stateToProps = ({ }) => ({  });

@connect(stateToProps)
export class Invite extends Component<any, any> {
  private navigator: any;

  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    const { id } = route;

    switch (id) {
      case 'requestView':
        return (
         <RequestView/>
        )
      case 'requestForm':
        return (
            <RequestForm/>
        )

      case 'statusView':
        return (
            <StatusView/>
        )

      default:
        return (
         <RequestView/>
        )
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ id: 'statusView' }}
        renderScene={this.renderScene.bind(this)} />)
  }
}