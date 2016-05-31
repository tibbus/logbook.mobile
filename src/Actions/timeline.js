import {
  ADD_TIMELINE,
  ADD_TIMELINE_STATUS
} from './Types'
import { getTimeline } from '../API/Timeline'
import { createStatus } from '../API/Status'

export const setCarTimeline = ({
  carInfoId
}) => {
  return dispatch => {
    getTimeline({}, { carInfoId })
      .then(data => {
        const { results } = data
        dispatch({
          carInfoId,
          timeline: results,
          type: ADD_TIMELINE
        })
      })
      .catch(e => {
        console.info(e)
      })
  }
}

const addStatusAction = (carInfoId, details, pending) => ({
  carInfoId,
  type: ADD_TIMELINE_STATUS,
  data: {
    type: 'Status',
    details
  },
  pending
})

export const addCarTimelineStatus = ({
  carInfoId,
  description
}) => {
  const body = { description, topics: [] }
  const request = { body }

  return dispatch => {
    dispatch(details => dispatch(addStatusAction(carInfoId, body, true)))
    createStatus(request, { carInfoId })
      .then(details => {
        dispatch(addStatusAction(carInfoId, details))
      })
      .catch(console.info)
  }
}
