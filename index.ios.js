import React from 'react';
import { AppRegistry } from 'react-native';
//import codePush from 'react-native-code-push';

import { App } from './build/App';

//const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
//const AppWithCodePush = codePush(codePushOptions)(App);
//AppRegistry.registerComponent('Logbook', () => AppWithCodePush)

AppRegistry.registerComponent('Logbook', () => App);
