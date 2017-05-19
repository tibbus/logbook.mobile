import {
  ADD_TIMELINE,
  ADD_TIMELINE_ITEM,
  DELETE_TIMELINE_ITEM,
  UPDATE_TIMELINE_ITEM,
  PLAY_TIMELINE_VIDEO,
  PAUSE_TIMELINE_VIDEO,
  REMOVE_USER_LIKED_ITEM,
  ADD_USER_LIKED_ITEM
} from '../Actions/Types'
import { timelineItemReducer } from './statuses'
import { sort } from 'ramda'
import moment from 'moment'

const initialState = []

const modifier = timelineItem => {
  let { createdDate } = timelineItem.activityData

  if (!createdDate) {
    createdDate = new Date();
  }

  const timeAgo = moment(new Date(createdDate)).from(moment())

  return {
    ...timelineItem,
    details: {
      ...timelineItem,
      timeAgo
    }
  }
}

// @todo : review exactly what data should be here and in what Structure type
const newTimelineItem = (timeline, { data, pending, carInfoId }) => {
  const details = {
    carData: {},
    topics: [],
    ...data.details,
  };

  return {
    actorType: 'car',
    actorId: carInfoId,
    timeline: [{ type: data.type, activityData: details, pending, details, carData: {} }].concat(
      timeline
        .filter(({ pending }) => !pending)
        .map(modifier)
    )
  };
}

interface CarInfo {
  type: any,
  id: any,
  details: any
}

const itemMatch = (item1, { type, id, details = {} }: CarInfo) => (
  item1.type === type && item1.details.id === (id || details.id)
)

const removeTimelineItem = (action, state) => {
  const { item } = action
  const { timeline, actorId } = state

  return {
    actorId,
    timeline: timeline.filter(item1 => !itemMatch(item1, item))
  }
}

const timelineReducer = (state = [], action) => {
  const { type, item } = action;
  const { timeline, actorId, actorType }: any = state;

  switch (type) {
    case ADD_TIMELINE_ITEM:
      return newTimelineItem(timeline, action);

    case DELETE_TIMELINE_ITEM:
      return removeTimelineItem(action, state)

    case UPDATE_TIMELINE_ITEM: {
      return {
        actorType,
        actorId,
        timeline: timeline.map(item2 => {
          if (itemMatch(item2, item)) {
            return timelineItemReducer(item2, action)
          }

          return item2
        })
      }
    }

    case ADD_USER_LIKED_ITEM: {
      return {
        actorType,
        actorId,
        timeline: timeline.map(item2 => {
          if (item2.activityData.id === action.updatedItem.postId) {
            return timelineItemReducer(item2, action)
          }
          return item2
        })
      }
    }

    case REMOVE_USER_LIKED_ITEM: {
      return {
        actorType,
        actorId,
        timeline: timeline.map(item2 => {
          if (item2.activityData.id === action.updatedItem.postId) {
            return timelineItemReducer(item2, action)
          }
          return item2
        })
      }
    }

    case PLAY_TIMELINE_VIDEO:
      return {
        actorType,
        actorId,
        timeline: timeline.map(videoMap(action))
      }

    case PAUSE_TIMELINE_VIDEO:
      return {
        actorType,
        actorId,
        timeline: timeline.map(videoMap(action))
      }

    default:
      return state
  }
}

const videoMap = action => item => {
  if (item.type !== 'Video') return item;

  if (item.details.id === action.postId) {
    return timelineItemReducer(item, action);
  }

  if (item.paused) {
    return item;
  }

  return timelineItemReducer(item, { ...action, type: PAUSE_TIMELINE_VIDEO })
};

const mapTimelines = (timelines, action, actorId, actorType) => timelines.map(timeline => {
  if (timeline.actorId === actorId && timeline.actorType === actorType) {
    return timelineReducer(timeline, action);
  }
  return timeline;
});

export const timelines = (state = initialState, action) => {
  const { actorType, actorId, type, timeline, item } = action;

  switch (type) {
    case ADD_TIMELINE:
      return [
        ...state,
        {
          actorType,
          actorId,
          timeline: timeline.map(modifier)
        }
      ];

    case ADD_TIMELINE_ITEM:
      return mapTimelines(state, action, action.carInfoId, 'car');

    case DELETE_TIMELINE_ITEM:
      return mapTimelines(state, action, actorId, actorType);

    // @todo : To be reviewed, doesn't look that are used anywhere
    // case UPDATE_TIMELINE_ITEM:
    //   return mapTimelines(state, action, item.details.actorId);

    // case PLAY_TIMELINE_VIDEO:
    //   return mapTimelines(state, action, action.actorId);

    // case PAUSE_TIMELINE_VIDEO:
    //   return mapTimelines(state, action, action.actorId);

    case ADD_USER_LIKED_ITEM:
      return mapTimelines(state, action, action.updatedItem.actorId, action.updatedItem.actorType);

    case REMOVE_USER_LIKED_ITEM:
      return mapTimelines(state, action, action.updatedItem.actorId, action.updatedItem.actorType);


    default:
      return state;
  }
};
