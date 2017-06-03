import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_BROWSING_CAR_CONTENT,
  SET_BROWSING_CAR,
  FOLLOW_CAR,
  SET_FOLLOWER_COUNT,
  USER_CAR_VERIFIED,
  ADD_TIMELINE,
  ADD_TIMELINE_ITEM,
  DELETE_TIMELINE_ITEM,
  SET_CAR_PROFILE_IMAGE
} from '../Actions/Types'

const initialState = {
  userCars: [],
  carToConfirm: null,
  browsingCars: [],
}

const updateCarFollowFlag = (state, followContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === followContent.carInfoId);
  car.followed = followContent.following;

  return { ...state };
}

const updateUserCarVerifiedStatus = (state, verifyContent) => {
  const car = state.userCars.find(userCar => userCar.carInfo.id === verifyContent.carInfoId);
  car.verified = verifyContent.verified

  return { ...state };
}

const updateCarFollowersCount = (state, followersContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === followersContent.carInfoId);

  if (followersContent.count) {
    car.carStats.followersCount.count = followersContent.count;
  }

  if (followersContent.loadPending !== undefined) {
    car.carStats.followersCount.loadPending = followersContent.loadPending;
  }

  return { ...state }
}

const setBrowsingCar = (state, carInfo, ownerInfo) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carInfo.id)

  if (car) {
    return state;
  }

  const newCar = {
    ownerInfo: ownerInfo,
    carInfo: carInfo,
    carImages: {
      content: [],
      loadPending: true
    },
    carVideos: {
      content: [],
      loadPending: true
    },
    carStats: {
      followersCount: {
        count: 0,
        loadPending: true
      },
      mediaCount: {
        count: 0,
        loadPending: true
      },
      postsCount: {
        count: 0,
        loadPending: true
      },
    },
    followed: false
  }
  state.browsingCars.push(newCar);

  return { ...state };
}
const updateBrowsingCarContent = (state, carContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carContent.carInfoId);

  let carImageCount = 0;
  let carVideoCount = 0;

  if (car) {
    if (carContent.type === 'Images' && car.carImages) {
      carContent.content.forEach(item => {
        const isItemInCars = car.carImages.content.find(carItem => carItem.createdDate === item.createdDate);
        if (!isItemInCars) {
          car.carImages.content.push(item);
        }
      });
      carImageCount = car.carImages.content.length;
      car.carImages.loadPending = false;
    }
    else if (car.carVideos) {
      carContent.content.forEach(item => {
        const isItemInCars = car.carVideos.content.find(carItem => carItem.createdDate === item.createdDate);
        if (!isItemInCars) {
          car.carVideos.content.push(item);
        }
      });
      carVideoCount = car.carVideos.content.length;
      car.carVideos.loadPending = false;
    }

    car.carStats.mediaCount.count = carImageCount + carVideoCount;
    car.carStats.mediaCount.loadPending = false;

    return { ...state };
  }
  else {
    return state;
  }
}

const addUserCar = (state, userCar) => {
  state.userCars.push(userCar);
  return { ...state }
}

const setCarPostCount = (state, carInfoId, timeline) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carInfoId);

  if (car && car.carStats.postsCount.loadPending === true) {
    car.carStats.postsCount.count = timeline.length;
    car.carStats.postsCount.loadPending = false;

    return { ...state };
  }

  return state;
}

const updateCarPostCount = (state, carInfoId, operation) => {

  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carInfoId);

  if (car) {

    if (operation === "ADD") {
      car.carStats.postsCount.count += 1;
      return { ...state };
    }
    else if (operation === "REMOVE") {
      car.carStats.postsCount.count -= 1;
      return { ...state };
    }
    else {
      return state;
    }
  }

  return state;

}

const updateCarProfileImage = (state, carInfoId, image) => {
  const car = state.userCars.find(userCar => userCar.carInfo.id === carInfoId);

  if (car) {
    car.carInfo.image = image;
    return { ...state };
  }

  return state;
}

export const cars = (state = initialState, action) => {
  const { type, userCars, userCar, carInfo, ownerInfo, carContent, followContent, followersContent, verifyContent, carInfoId, timeline, image } = action

  switch (type) {

    case ADD_CAR:
      return addUserCar(state, userCar);

    case USER_CAR_VERIFIED:
      return updateUserCarVerifiedStatus(state, verifyContent);

    case SET_USER_CARS:
      return {
        ...state,
        userCars: userCars
      }

    case SEARCHED_CAR:
      return {
        ...state,
        carToConfirm: carInfo
      }

    case UPDATE_BROWSING_CAR_CONTENT:
      return updateBrowsingCarContent(state, carContent);

    case SET_BROWSING_CAR:
      return setBrowsingCar(state, carInfo, ownerInfo);

    case FOLLOW_CAR:
      return updateCarFollowFlag(state, followContent);

    case SET_FOLLOWER_COUNT:
      return updateCarFollowersCount(state, followersContent);

    case SET_FOLLOWER_COUNT:
      return updateCarFollowersCount(state, followersContent);

    case ADD_TIMELINE:
      return setCarPostCount(state, carInfoId, timeline);

    case ADD_TIMELINE_ITEM:
      return updateCarPostCount(state, carInfoId, "ADD");

    case DELETE_TIMELINE_ITEM:
      return updateCarPostCount(state, carInfoId, "REMOVE");

    case SET_CAR_PROFILE_IMAGE:
      return updateCarProfileImage(state, carInfoId, image);

    default:
      return state
  }
}
