import {
    SEARCHED_CAR,
    SET_LOADING_STATUS,
    UNSET_LOADING_STATUS,
    UPDATE_BROWSING_CAR_CONTENT,
    SET_BROWSING_CAR,
    FOLLOW_CAR,
    SET_FOLLOWER_COUNT,
    SET_CAR_PROFILE_IMAGE
} from './Types'
import {
    getCarByRegistration,
    getCarById as getCarByIdApi,
    getCarOwnerById as getCarOwnerByIdApi,
    getCarImages,
    getCarVideos,
    followCar as followCarApi,
    unFollowCar as unFollowCarApi,
    updateProfileImage as updateProfileImageApi
} from '../API/Car'
import { getCarFollowers } from '../API/GetStream'
import { getGetStreamToken } from '../API/user'
import { getUserFollowingFeeds } from './user'
import { getApiFetchLimit } from '../API/config'
import { dispatch } from '../store';

export const getCar = (registration, onSuccess, onFailure) => {
    return dispatch => {
        dispatch({ type: SET_LOADING_STATUS, resourceName: 'cars' })
        getCarByRegistration({}, { registration })
            .then(carInfo => {
                dispatch({ type: SEARCHED_CAR, carInfo });
                dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
                onSuccess();
            })
            .catch(error => {
                console.log(error);
                onFailure();
                dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
            })
    }
}

export const getCarById = (carInfoId) => {
    return dispatch => {
        dispatch({ type: SET_LOADING_STATUS, resourceName: 'cars' })
        getCarByIdApi({}, { carInfoId })
            .then((carResponse: any) => {
                getCarOwnerByIdApi({}, { carInfoId })
                    .then(carOwnerResponse => {
                        dispatch(setBrowsingCar(carResponse.carInfo, carOwnerResponse))
                        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
                    })
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
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

export const setBrowsingCar = (carInfo, ownerInfo) => {
    return dispatch => {
        dispatch({ type: SET_LOADING_STATUS, resourceName: 'cars' })
        dispatch({ type: SET_BROWSING_CAR, carInfo: carInfo, ownerInfo: ownerInfo });
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'cars' });
    }
}

export const getCarTimelineContent = (carInfoId, contentType, skip = 0) => {
    return dispatch => {
        const takeLimit = getApiFetchLimit();
        if (contentType === "Images") {
            getCarImages({}, { carInfoId, skip, takeLimit })
                .then((imagePosts: any) => {

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

        if (contentType === "Videos") {
            getCarVideos({}, { carInfoId, skip, takeLimit })
                .then((videoPosts: any) => {
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
                dispatch(getUserFollowingFeeds(userId))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const unFollowCar = (userId, carInfoId) => {
    return dispatch => {
        unFollowCarApi({}, { userId, carInfoId })
            .then(data => {
                dispatch({
                    type: FOLLOW_CAR,
                    followContent: {
                        carInfoId: carInfoId,
                        following: false
                    }
                });
                dispatch(getUserFollowingFeeds(userId))
            })
            .catch(error => {
                console.log()
            })
    }
}

//@TODO: Need circuit breaker pattern here.
export const getCarFollowersCount = (id) => {
  return dispatch => {

    dispatch({
        type: SET_FOLLOWER_COUNT,
        followersContent: {
            carInfoId: id,
            loadPending: false,
        }
    })

    const body = { actorId: id, actorType: 'car' }
    getGetStreamToken({ body }, {})
      .then((tokenResponse: any) => {

        getCarFollowers(tokenResponse.token, id)
          .then(carFollowersResponse => {
            console.log(carFollowersResponse)
            dispatch({
              type: SET_FOLLOWER_COUNT,
              followersContent: {
                carInfoId: id,
                count: carFollowersResponse.length
              }
            })
          })
          .catch(args => {
            console.log(args);
        })
      })
      .catch(args => {
          console.log(args);
    })
  }
};

export const updateProfileImage = (carInfoId, profileImageRequest, onSuccess = null, onFailure = null) => {

  return () => {
    updateProfileImageApi(fileRequest('image', profileImageRequest), { id: carInfoId })
      .then((response: any) => {
        dispatch({ type: SET_CAR_PROFILE_IMAGE, carInfoId, image: response.image })
        if(onSuccess) {
            onSuccess();
        }
      })
      .catch(error => {
        console.log(error)
        if(onFailure) {
            onFailure();
        }
      })
  }
}

const fileRequest = (mediaType, files) => ({
  body: {
    image: formatFiles(mediaType, files),
  }
});

const formatFiles = (mediaType, file) => {
  const { uri, extension = '', id } = file
  const extLower = extension.toLowerCase()
  const type = `${mediaType}/${extLower}`
  const name = `${id}.${extLower}`
  return { uri, type, name }
}