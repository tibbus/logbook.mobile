import React from 'react'
import { AppRegistry } from 'react-native'
import { App } from './build/App'

import codePush from 'react-native-code-push';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
const AppWithCodePush = codePush(codePushOptions)(App);
AppRegistry.registerComponent('Logbook', () => AppWithCodePush)
