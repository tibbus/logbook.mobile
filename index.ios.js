import React from 'react';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';

import { App } from './build/App';

const codePushOptions = { updateDialog: true, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.IMMEDIATE };
//codePush.sync({updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE});
const AppWithCodePush = codePush(codePushOptions)(App)
AppRegistry.registerComponent('Logbook', () => AppWithCodePush);

//AppRegistry.registerComponent('Logbook', () => App);
