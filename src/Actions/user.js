import { getUser } from '../API/fetch'
import { confirmUserCar, getUserCars } from '../API/UserCar'
import { getFollowCount } from '../API/user'
import { objKeysToDecap } from '../Utils'
import {
  ADD_CAR,
  SET_USER,
  SET_USER_CARS,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  SET_USER_FOLLOW_COUNT,
  SET_USER_CAR_COUNT } from './Types'

export const setUserProfile = () => {
  return dispatch => {
    getUser()
      .then(userDetails => {
        const user = {
          ...userDetails,
          //profile: objKeysToDecap(JSON.parse(userDetails.profile))
        }
        dispatch({
          type: SET_USER,
          user
        })
      })
  }
}

export const updateUserCars = ({
  userId,
  details = true
} = {}) => {
  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'cars' })
    getUserCars({}, { userId, details })
      .then(userCars => {
        dispatch({ type: SET_USER_CARS, userCars });
        dispatch({ type: SET_USER_CAR_COUNT,count: userCars.length });
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });        
      })
        
      .catch(() => {
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' })
      })
  }
}

export const addUserCar = ({ userId, carInfoId }) => {
  return dispatch => (
    confirmUserCar({}, { userId, carInfoId })
      .then(userCar => {
        dispatch({
          type: ADD_CAR,
          userCar
        })
      })
      .catch(e => {

      })
  )
}

export const updateUserFollowCount = (id) => {
  return dispatch => {
    
    getFollowCount({}, { id })
      .then(countResponse => {
        dispatch({ 
          type: SET_USER_FOLLOW_COUNT,
          count: countResponse.count
          })
      })
      .catch(e => {

      })
  };
}
