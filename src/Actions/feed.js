import { getTimeline } from '../API/Timeline'
import { getCarOwnerById } from '../API/Car'
import { ADD_FEED_ITEM } from './Types'

const dispatchFeedItem = (carOwner, feedItem) => {
  return dispatch => {
    dispatch({
      type: ADD_FEED_ITEM,
      feedItem: {
          ...feedItem,
          ...carOwner
      }
    })
  }
}

export const getUserFeed = (userId) => {
  return dispatch => {
    getTimeline('user', userId , { userId })
      .then(data => {
        
        data.map(feedItem => {
          getCarOwnerById(feedItem.activityData.carInfoId)
          .then(carOwner => dispatch(dispatchFeedItem(carOwner, feedItem)))
          .catch(error => console.log(error))
        })

      })
      .catch(e => {
        // TODO Handle timeline init failure
      })
  }
}