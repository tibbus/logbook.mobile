import { getUser } from '../API/fetch'
import { createUserCar, getUserCars } from '../API/UserCar'
import { ADD_CAR, SET_USER, SET_USER_CARS, SET_LOADING_STATUS, UNSET_LOADING_STATUS } from './Types'

export const setUserProfile = () => {
  return dispatch => {
    getUser()
      .then(user => dispatch({
        type: SET_USER,
        user
      }))
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
        dispatch({ type: SET_USER_CARS, userCars })
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' })
      })
      .catch(() => {
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' })
      })
  }
}

export const addUserCar = ({ userId, registration }) => {
  return dispatch => (
    createUserCar({}, { userId, registration })
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
