import {
  SEARCHED_CAR,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  UPDATE_USER_CAR_CONTENT,
  FOLLOW_CAR
} from './Types'
import { getCarByRegistration, getCarImages, getCarVideos, followCar, unfollowCar } from '../API/Car'
import { getApiFetchLimit } from '../API/config'

export const getCar = (registration) => {
    return dispatch => {
        dispatch({ type: SET_LOADING_STATUS, resourceName: 'cars' })
        getCarByRegistration({}, { registration })
        .then(carInfo => {
            dispatch({type: SEARCHED_CAR, carInfo});
            dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });  
        })
        .catch(error => {

        })
    }
}

const extractPostDetails = (post) => {
    return {
        description: post.details.description,
        location: post.details.location,
        contentUris: post.details.contentUris,
        createdDate: post.details.createdDate
    }
}

export const getCarTimelineContent = (carInfo, contentType, skip = 0) => {
    return dispatch => {
        const takeLimit = getApiFetchLimit();
        const { id } = carInfo;
        if(contentType === "Images") {
            getCarImages({}, { carInfoId: id, skip, takeLimit})
            .then(imagePosts => {
                
                const posts = imagePosts.results.map(extractPostDetails);
                dispatch({ 
                    type: UPDATE_USER_CAR_CONTENT,
                    carContent: {
                        type: 'Images',
                        carInfo: carInfo,
                        content: posts,  
                    } 
                });  
            })
            .catch(error => {
                
            })
        }

        if(contentType === "Videos") {
            getCarVideos({}, { carInfoId: id, skip, takeLimit})
            .then(videoPosts => {
                const posts = videoPosts.results.map(extractPostDetails);
                dispatch({ 
                    type: UPDATE_USER_CAR_CONTENT,
                    carContent: {
                        type: 'Videos',
                        carInfo: carInfo,
                        content: posts,
                    },
                });  
            })
            .catch(error => {
                
            })
        }

        
    }
}

export const followCar = (userId, carInfoId) => {
    return dispatch => {
        followCar({}, { userId, carInfoId })
        .then(data => {
            dispatch({ 
                type: FOLLOW_CAR, 
                followContent: {
                    carInfoId: carInfoId,
                    following: true
                } 
            });  
        })
        .catch(error => {

        })
    }
}

export const unFollowCar = (userId, carInfoId) => {
    return dispatch => {
        unFollowCar({}, { userId, carInfoId })
        .then(data => {
            dispatch({ 
                type: FOLLOW_CAR, 
                followContent: {
                    carInfoId: carInfoId,
                    following: false
                } 
            });  
        })
        .catch(error => {

        })
    }
}