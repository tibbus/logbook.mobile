/// <reference path="../typings/react-native.d.ts" />

import React, {
  Component
} from 'react'
import { RootNav } from './Components'
import { Provider } from 'react-redux'
import { store } from './store'

export class App extends Component<any, any> {

  render () {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    )
  }

}
