import {
  SEARCHED_CAR,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  UPDATE_USER_CAR_IMAGES
} from './Types'
import { getCarByRegistration, getCarImages } from '../API/Car'

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

export const getCarTimelineImages = (carInfoId) => {
    return dispatch => {
        getCarImages({}, { carInfoId })
        .then(images => {
            dispatch({ type: UPDATE_USER_CAR_IMAGES, userCarImages: { carInfoId:carInfoId, userCarImages:images } });  
        })
        .catch(error => {
            
        })
    }
}