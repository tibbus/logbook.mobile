import {
  ADD_TIMELINE,
  ADD_TIMELINE_ITEM,
  DELETE_TIMELINE_ITEM,
  UPDATE_TIMELINE_ITEM,
  PLAY_TIMELINE_VIDEO,
  PAUSE_TIMELINE_VIDEO
} from '../Actions/Types'
import { timelineItemReducer } from './statuses'
import { sort } from 'ramda'
import moment from 'moment'

const initialState = []

const modifier = timelineItem => {
  const { createdDate } = timelineItem.activityData
  const timeAgo = moment(new Date(createdDate)).from(moment())

  return {
    ...timelineItem,
    details: {
      ...timelineItem,
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

const itemMatch = (item1, { type, id, details = {} }) => (
  item1.type === type && item1.details.id === (id || details.id)
)

const removeTimelineItem = (action, state) => {
  const { item } = action
  const { timeline, carInfoId } = state

  return {
    carInfoId,
    timeline: timeline.filter(item1 => !itemMatch(item1, item))
  }
}

const timelineReducer = (state = [], action) => {
  const { type, item } = action
  const { timeline, carInfoId } = state

  switch (type) {
    case ADD_TIMELINE_ITEM:
      return newTimelineItem(timeline, carInfoId, action)

    case DELETE_TIMELINE_ITEM:
      return removeTimelineItem(action, state)

    case UPDATE_TIMELINE_ITEM: {
      return {
        carInfoId,
        timeline: timeline.map(item2 => {
          if (itemMatch(item2, item)) {
            return timelineItemReducer(item2, action)
          }

          return item2
        })
      }
    }

    case PLAY_TIMELINE_VIDEO:
      return {
        carInfoId,
        timeline: timeline.map(videoMap(action))
      }

    case PAUSE_TIMELINE_VIDEO:
      return {
        carInfoId,
        timeline: timeline.map(videoMap(action))
      }

    default:
      return state
  }
}

const videoMap = action => item => {
  if (item.type !== 'Video') return item

  if (item.details.id === action.postId) {
    return timelineItemReducer(item, action)
  }

  if (item.paused) {
    return item
  }

  return timelineItemReducer(item, { ...action, type: PAUSE_TIMELINE_VIDEO })
}

const mapTimelines = (timelines, action, carInfoId) => timelines.map(timeline => {
  if (timeline.carInfoId === carInfoId) {
    return timelineReducer(timeline, action)
  }
  return timeline
})

export const timelines = (state = initialState, action) => {
  const { carInfoId, type, timeline, item } = action

  switch (type) {
    case ADD_TIMELINE:
      return [
        ...state,
        {
          carInfoId,
          timeline: timeline.map(modifier)
        }
      ]

    case ADD_TIMELINE_ITEM:
      return mapTimelines(state, action, action.carInfoId)

    case DELETE_TIMELINE_ITEM:
      return mapTimelines(state, action, item.carInfoId)

    case UPDATE_TIMELINE_ITEM:
      return mapTimelines(state, action, item.details.carInfoId)

    case PLAY_TIMELINE_VIDEO:
      return mapTimelines(state, action, action.carInfoId)

    case PAUSE_TIMELINE_VIDEO:
      return mapTimelines(state, action, action.carInfoId)

    default:
      return state
  }
}
