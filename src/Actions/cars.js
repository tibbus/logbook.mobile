import {
  SEARCHED_CAR,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS
} from './Types'
import { getCarByRegistration } from '../API/Car'

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