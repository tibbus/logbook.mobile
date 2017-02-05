import {
  SEARCHED_CAR,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  UPDATE_USER_CAR_IMAGES,
  UPDATE_USER_CAR_VIDEOS
} from './Types'
import { getCarByRegistration, getCarImages, getCarVideos } from '../API/Car'
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

export const getCarTimelineContent = (carInfoId, contentType, skip = 0) => {
    return dispatch => {
        const takeLimit = getApiFetchLimit();

        if(contentType == "Images") {
            getCarImages({}, { carInfoId, skip, takeLimit})
            .then(imagePosts => {
                
                const posts = imagePosts.results.map(extractPostDetails);
                dispatch({ 
                    type: UPDATE_USER_CAR_IMAGES,
                    carImages: {
                        carInfoId: carInfoId,
                        posts: posts
                    },
                    carImagesLoadPending: false 
                });  
            })
            .catch(error => {
                
            })
        }

        if(contentType == "Videos") {
            getCarVideos({}, { carInfoId, skip, takeLimit})
            .then(videoPosts => {
                
                const posts = videoPosts.results.map(extractPostDetails);
                dispatch({ 
                    type: UPDATE_USER_CAR_VIDEOS,
                    carVideos: {
                        carInfoId: carInfoId,
                        posts: posts
                    },
                    carDataLoadPending: false 
                });  
            })
            .catch(error => {
                
            })
        }

        
    }
}