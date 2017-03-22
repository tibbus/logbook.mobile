import * as reducers from './Reducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

const allReducers: any = reducers;

export const store = createStore(
  combineReducers(allReducers),
  applyMiddleware(thunk)
)
