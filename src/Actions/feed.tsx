import { getTimeline } from '../API/Timeline'
import { getCarOwnerById } from '../API/Car'
import { ADD_FEED_ITEM } from './Types'

const dispatchFeedItem = (carOwner, feedItem) => {
    return dispatch => {
        dispatch({
            type: ADD_FEED_ITEM,
            feedItem: {
                ...feedItem,
                carOwner: carOwner
            }
        })
    }
}

export const getUserFeed = (userId) => {
    return dispatch => {
        getTimeline('user', userId, { userId })
            .then((data: any) => {

                data.map(feedItem => {
                    const { carInfoId } = feedItem.activityData;
                    getCarOwnerById({}, { carInfoId })
                        .then(carOwner => dispatch(dispatchFeedItem(carOwner, feedItem)))
                        .catch(error => console.log(error))
                })

            })
            .catch(e => {
                // TODO Handle timeline init failure
            })
    }
}