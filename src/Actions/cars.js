import {
  SEARCHED_CAR,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  UPDATE_BROWSING_CAR_CONTENT,
  SET_BROWSING_CAR,
  FOLLOW_CAR
} from './Types'
import { getCarByRegistration, 
    getCarById as getCarByIdApi, 
    getCarImages, 
    getCarVideos, 
    followCar as followCarApi, 
    unfollowCar } from '../API/Car'
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

export const getCarById = (carInfoId) => {
    return dispatch => {
        getCarByIdApi({}, { carInfoId })
        .then(carResponse => {
            dispatch(setBrowsingCar(carResponse.carInfo)) 
        })
        .catch(error => {
            console.log(error);
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

export const setBrowsingCar = (carInfo) => { 
    return dispatch => {
        dispatch({ 
            type: SET_BROWSING_CAR,
            carInfo:  carInfo
        });  
    }
}

export const getCarTimelineContent = (carInfoId, contentType, skip = 0) => {
    return dispatch => {
        const takeLimit = getApiFetchLimit();
        if(contentType === "Images") {
            getCarImages({}, { carInfoId, skip, takeLimit})
            .then(imagePosts => {
                
                const posts = imagePosts.results.map(extractPostDetails);
                dispatch({ 
                    type: UPDATE_BROWSING_CAR_CONTENT,
                    carContent: {
                        carInfoId: carInfoId,
                        type: 'Images',
                        content: posts,  
                    } 
                });  
            })
            .catch(error => {
                
            })
        }

        if(contentType === "Videos") {
            getCarVideos({}, { carInfoId, skip, takeLimit})
            .then(videoPosts => {
                const posts = videoPosts.results.map(extractPostDetails);
                dispatch({ 
                    type: UPDATE_BROWSING_CAR_CONTENT,
                    carContent: {
                        carInfoId: carInfoId,
                        type: 'Videos',
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
        followCarApi({}, { userId, carInfoId })
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