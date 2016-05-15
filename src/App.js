import React, {
  Component
} from 'react-native'
import { RootNav } from './Components'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './Reducers'
import thunk from 'redux-thunk'

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
)

export class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    )
  }

}

