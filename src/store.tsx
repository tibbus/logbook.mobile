import * as reducers from './Reducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk'

const allReducers: any = reducers;

export const store = createStore(
  combineReducers(allReducers),
  composeWithDevTools(
    applyMiddleware(thunk),
  ));

export const dispatch: any = store.dispatch;