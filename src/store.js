import * as reducers from './Reducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
)
