import {
    ADD_FEED_ITEM
} from '../Actions/Types'
import moment from 'moment'
import { sortBy } from 'ramda'


/*
    {
        feedItem,
        timeAgo: '',
        liked: ''
    }
*/
const initialState = {
    posts: []
}

const calculateTime = (feedItem) => {
    const { createdDate } = feedItem.activityData
    const timeAgo = moment(new Date(createdDate)).from(moment())

    return timeAgo;
}

const addFeedItem = (state, feedItem) => {

    const timeAgo = calculateTime(feedItem);

    if(state.posts.find(item => item.activityData.id === feedItem.activityData.id)) {

        const newState = {
            posts: []
        }
        newState.posts = state.posts.filter((item) => item.activityData.id !== feedItem.activityData.id)

        newState.posts.push({
            ...feedItem,
            timeAgo: timeAgo
        });

        return {...newState};
    }
    else {
        state.posts.push({
            ...feedItem,
            timeAgo: timeAgo
        });

        return {...state};
    }
    
}

export const feed = (state = initialState, action) => {
  const { type, feedItem } = action

  switch (type) {

      case ADD_FEED_ITEM:
        return addFeedItem(state, feedItem);
    
       
    default:
      return state
  }
}
