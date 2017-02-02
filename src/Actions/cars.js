import {
  SEARCHED_CAR,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  UPDATE_USER_CAR_IMAGES
} from './Types'
import { getCarByRegistration, getCarImages } from '../API/Car'
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

const extractImagePost = (imagePost) => {
    return {
        description: imagePost.details.description,
        location: imagePost.details.location,
        imageUris: imagePost.details.contentUris,
        createdDate: imagePost.details.createdDate
    }
}

export const getCarTimelineImages = (carInfoId, skip = 0) => {
    return dispatch => {
        const takeLimit = getApiFetchLimit();
        getCarImages({}, { carInfoId, skip, takeLimit})
        .then(imagePosts => {
            
            const posts = imagePosts.results.map(extractImagePost);
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
}