import {
  ADD_TIMELINE,
  ADD_TIMELINE_IMAGE,
  ADD_TIMELINE_STATUS,
  DELETE_IMAGE,
  DELETE_STATUS,
  UPDATE_STATUS
} from '../Actions/Types'
import { statusReducer } from './statuses'
import { sort } from 'ramda'
import moment from 'moment'

const initialState = []
const sortByCreated = sort(
  (item, item2) =>
    (new Date(item2.details.createdDate)).getTime() -
    (new Date(item.details.createdDate)).getTime())

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

const newTimelineItem = (timeline, carInfoId, { data, pending }) => ({
  carInfoId,
  timeline: [{ ...data, pending }].concat(
    timeline
      .filter(({ pending }) => !pending)
      .map(modifier)
  )
})

const removeTimelineItem = (action, state, type) => {
  const { post } = action
  const { timeline, carInfoId } = state

  return {
    carInfoId,
    timeline: timeline.filter(item => {
      if (item.type === type && item.details.id === post.id) {
        return false
      }
      return true
    })
  }
}

const timelineReducer = (state = [], action) => {
  const { type, status } = action
  const { timeline, carInfoId } = state

  switch (type) {

    case ADD_TIMELINE_IMAGE:
      return newTimelineItem(timeline, carInfoId, action)

    case ADD_TIMELINE_STATUS:
      return newTimelineItem(timeline, carInfoId, action)

    case DELETE_IMAGE:
      return removeTimelineItem(action, state, 'Image')

    case DELETE_STATUS:
      return removeTimelineItem(action, state, 'Status')

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
  const { carInfoId, type, timeline, status, post } = action

  switch (type) {
    case ADD_TIMELINE:
      return [
        ...state,
        {
          carInfoId,
          timeline: sortByCreated(timeline).map(modifier)
        }
      ]

    case ADD_TIMELINE_IMAGE:
      return mapTimelines(state, action, action.carInfoId)

    case ADD_TIMELINE_STATUS:
      return mapTimelines(state, action, action.carInfoId)

    case DELETE_STATUS:
      return mapTimelines(state, action, post.carInfoId)

    case DELETE_IMAGE:
      return mapTimelines(state, action, post.carInfoId)

    case UPDATE_STATUS:
      return mapTimelines(state, action, status.carInfoId)

    default:
      return state
  }
}
