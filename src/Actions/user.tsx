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
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'updateUserCar' })
    getUserCars({}, { userId, details })
      .then(userCars => {
        dispatch({ type: SET_USER_CARS, userCars });
        dispatch({ type: SET_USER_CAR_COUNT, count: userCars.length });
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'updateUserCar' });
      })

      .catch(() => {
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'updateUserCar' })
      })
  }
}

export const addUserCar = (userId, carInfoId, onSuccess, onFailure) => {
  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'addUserCar' })
    confirmUserCar({}, { userId, carInfoId })
      .then(userCar => {
        dispatch({
          type: ADD_CAR,
          userCar
        })
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addUserCar' });
        onSuccess();
      })
      .catch(error => {
        console.log(error);
        onFailure();
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addUserCar' });
      })
  }
}

export const verifyUserCar = (userId, carInfoId, vinNumbers, onSuccess, onFailure) => {
  return dispatch => {
    const body = {
      firstLetter: vinNumbers.first,
      secondLetter: vinNumbers.second,
      lastLetter: vinNumbers.last
    };
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'verifyUserCar' })
    verifyUserCarApi({body}, {userId, carInfoId})
      .then(verifyResponse => {
        dispatch({
          type: USER_CAR_VERIFIED,
          verifyContent: {
            carInfoId: carInfoId,
            verified: verifyResponse.verified
          }
        })
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'verifyUserCar' });
        onSuccess();

      })
      .catch(e => {
        console.log(e);
        onFailure();
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'verifyUserCar' });
      })
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
