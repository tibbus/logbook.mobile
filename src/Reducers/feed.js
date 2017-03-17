import {
    ADD_FEED_ITEM
} from '../Actions/Types'


/*
    {
        feedItem,
        timeAgo: '',
        liked: ''
    }
*/
const initialState = {
    feed: []
}

const calculateTime = (feedItem) => {
    const { createdDate } = feedItem.activityData
    const timeAgo = moment(new Date(createdDate)).from(moment())

    return timeAgo;
}

const addFeedItem = (state, feedItem) => {
    state.feed.splice(state.feed.indexOf(feedItem), 1)

    const timeAgo = calculateTime(feedItem);

    state.feed.push({
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
