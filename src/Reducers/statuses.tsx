import {
  PAUSE_TIMELINE_VIDEO,
  PLAY_TIMELINE_VIDEO,
  UPDATE_TIMELINE_ITEM,
  ADD_USER_LIKED_ITEM,
  REMOVE_USER_LIKED_ITEM
} from '../Actions/Types'

const setStatePaused = (state, paused) => ({ ...state, paused })

export const timelineItemReducer = (state: any = {}, action) => {
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

    case ADD_USER_LIKED_ITEM:
      const addLikeTimelineItem = {
        ...state,
        pending,
        details: {
          ...state.details
        }
      }
      addLikeTimelineItem.socialData.likesCount += 1;
      return addLikeTimelineItem;

    case REMOVE_USER_LIKED_ITEM:
      const removeLikeTimelineItem = {
        ...state,
        pending,
        details: {
          ...state.details
        }
      }
      removeLikeTimelineItem.socialData.likesCount -= 1;
      return removeLikeTimelineItem;

    case PLAY_TIMELINE_VIDEO:
      return setStatePaused(state, false)

    case PAUSE_TIMELINE_VIDEO:
      return setStatePaused(state, true)

    default:
      return state
  }
}
