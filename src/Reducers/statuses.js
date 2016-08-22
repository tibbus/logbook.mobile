import {
  PAUSE_TIMELINE_VIDEO,
  PLAY_TIMELINE_VIDEO,
  UPDATE_TIMELINE_ITEM
} from '../Actions/Types'

const setStatePaused = (state, paused) => ({ ...state, paused })

export const timelineItemReducer = (state = {}, action) => {
  const { type, item, pending = false } = action

  switch (type) {
    case UPDATE_TIMELINE_ITEM:
      return {
        ...state,
        pending,
        details: {
          ...state.details,
          ...item.details
        }
      }

    case PLAY_TIMELINE_VIDEO:
      return setStatePaused(state, false)

    case PAUSE_TIMELINE_VIDEO:
      return setStatePaused(state, true)

    default:
      return state
  }
}
