import test from 'ava'
import {
  timelineItemReducer
} from '../../src/Reducers/statuses'
import {
  pauseVideoAction,
  playVideoAction
} from '../../src/Actions/timeline'

test('should set paused to false', t => {
  const initialState = { id: 10, paused: true }
  const stateCopy = { ...initialState }
  const result = timelineItemReducer(initialState, playVideoAction())
  t.deepEqual(result, { ...initialState, paused: false })
  t.deepEqual(initialState, stateCopy)
})

test('should set paused to true', t => {
  const initialState = { id: 10, paused: false }
  const stateCopy = { ...initialState }
  const result = timelineItemReducer(initialState, pauseVideoAction())
  t.deepEqual(result, { ...initialState, paused: true })
  t.deepEqual(initialState, stateCopy)
})
