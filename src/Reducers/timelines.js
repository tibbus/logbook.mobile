import {
  ADD_TIMELINE,
  ADD_TIMELINE_STATUS,
  DELETE_STATUS,
  UPDATE_STATUS
} from '../Actions/Types'
import { statusReducer } from './statuses'
import { reverse } from 'ramda'
import moment from 'moment'

const initialState = []

const modifier = timelineItem => {
  const { details } = timelineItem
  const { createdDate } = details
  const timeAgo = moment(new Date(createdDate)).from(moment())

  return {
    ...timelineItem,
    details: {
      ...details,
      timeAgo
    }
  }
}

const timelineReducer = (state = [], action) => {
  const { type, status } = action
  const { timeline, carInfoId } = state

  switch (type) {

    case ADD_TIMELINE_STATUS:
      const { data, pending } = action
      return {
        carInfoId,
        timeline: [{ ...data, pending }].concat(
          timeline
            .filter(({ pending }) => !pending)
            .map(modifier)
        )
      }

    case DELETE_STATUS:
      return {
        carInfoId,
        timeline: timeline.filter(item => {
          if (item.type === 'Status' && item.details.id === status.id) {
            return false
          }
          return true
        })
      }

    case UPDATE_STATUS:
      return {
        carInfoId,
        timeline: timeline.map(item => {
          if (item.type === 'Status' && item.details.id === status.id) {
            return statusReducer(item, action)
          }
          return item
        })
      }
    default:
      return state
  }
}

const mapTimelines = (timelines, action, carInfoId) => timelines.map(timeline => {
  if (timeline.carInfoId === carInfoId) {
    return timelineReducer(timeline, action)
  }
  return timeline
})

export const timelines = (state = initialState, action) => {
  const { carInfoId, type, timeline, status } = action

  switch (type) {
    case ADD_TIMELINE:
      return [
        ...state,
        {
          carInfoId,
          timeline: reverse(timeline).map(modifier)
        }
      ]

    case ADD_TIMELINE_STATUS:
      return mapTimelines(state, action, action.carInfoId)

    case DELETE_STATUS:
      return mapTimelines(state, action, status.carInfoId)

    case UPDATE_STATUS:
      return mapTimelines(state, action, status.carInfoId)

    default:
      return state
  }
}
