import { getUser } from '../API/fetch'
import { confirmUserCar, getUserCars, verifyUserCar as verifyUserCarApi } from '../API/UserCar'
import { getFollowCount, getGetStreamToken } from '../API/user'
import { getUserFollowing } from '../API/GetStream'
import { objKeysToDecap } from '../Utils'
import {
  ADD_CAR,
  SET_USER,
  SET_USER_CARS,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS,
  SET_USER_FOLLOW_COUNT,
  SET_USER_CAR_COUNT,
  SET_USER_FOLLOWING,
  USER_CAR_VERIFIED
} from './Types'

export const setUserProfile = dispatch => {
  getUser().then(userDetails => {
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

export const updateUserCars = (userId = null,details = true) => {
  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'cars' })
    getUserCars({}, { userId, details })
      .then(userCars => {
        dispatch({ type: SET_USER_CARS, userCars });
        dispatch({ type: SET_USER_CAR_COUNT, count: userCars.length });
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
      })

      .catch(() => {
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' })
      })
  }
}

export const addUserCar = (userId, carInfoId) => {
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

export const verifyUserCar = (userId, carInfoId, vinNumbers) => {
  return dispatch => {
    const body = {
      firstNumber: vinNumbers.first,
      secondNumber: vinNumbers.second,
      lastNumber: vinNumbers.last
    };

    verifyUserCarApi(body, {userId, carInfoId})
      .then(verifyResponse => {
        dispatch({
          type: USER_CAR_VERIFIED,
          verifyContent: {
            carInfoId: carInfoId,
            verified: verifyResponse.verified
          }
        })
      })
      .catch(e => console.log(e))
  }
}

export const updateUserFollowCount = (id) => {
  return dispatch => {

    const body = { actorId: id, actorType: 'user' }
    getGetStreamToken({ body }, {})
      .then(tokenResponse => {

        getUserFollowing(tokenResponse.token, id)
          .then(userFollowingFeeds => {
            console.log(userFollowingFeeds)
            dispatch({
              type: SET_USER_FOLLOW_COUNT,
              count: userFollowingFeeds.length
            })
          })
          .catch(args => console.log(args))
      })
      .catch(args => console.log(args))
  }
};



export const getUserFollowingFeeds = (userId) => {

  return dispatch => {

    const body = { actorId: userId, actorType: 'user' }
    getGetStreamToken({ body }, {})
      .then(tokenResponse => {

        getUserFollowing(tokenResponse.token, userId)
          .then(userFollowingFeeds => {
            console.log(userFollowingFeeds)
            dispatch({
              type: SET_USER_FOLLOWING,
              follows: userFollowingFeeds
            })
          })
          .catch(args => console.log(args))
      })
      .catch(args => console.log(args))

  }
}
