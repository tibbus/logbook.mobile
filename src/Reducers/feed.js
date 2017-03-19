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
    const index = state.posts.indexOf(feedItem.activityData.id)
    if(index > -1){
        state.posts.splice(index, 1)
    }

    const timeAgo = calculateTime(feedItem);

    state.posts.push({
        ...feedItem,
        timeAgo: timeAgo
    });

    return {...state};
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
