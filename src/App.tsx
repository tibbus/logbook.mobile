

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { RootNav } from './Scenes/Navigation/RootNav';
import { store } from './store';

declare var console;

export class App extends Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}

// You can enable warnings from here !!
// Also warnings+logs of any type can be visualized on Simulator-->Debug-->System logs
console.disableYellowBox = true;