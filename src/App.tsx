/// <reference path="../typings/react-native.d.ts" />

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { RootNav } from './Scenes/Navigation/RootNav';
import { store } from './store';

export class App extends Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}
