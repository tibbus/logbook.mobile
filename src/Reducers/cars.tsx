import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_BROWSING_CAR_CONTENT,
  SET_BROWSING_CAR,
  FOLLOW_CAR,
  SET_FOLLOWER_COUNT
} from '../Actions/Types'

/*
browsingCars:[
  {
    ownerInfo: {
      userId: 1,
      name: '',
      profilePicture: ''
    },
    carInfo: {},
    carImages: {
      content: [],
      loadPending: true
    },
    carVideos: {
      content: [],
      loadPending: true
    }
    carStats: {
      followCount: {
        count: 0,
        loadPending: true
      },
      mediaCount: {
        count: 0,
        loadPending: true
      },
      postCount: {
        count: 0,
        loadPending: true
      },
    }
    followed: false
  }
]
*/
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

const updateCarFollowersCount = (state, followersContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === followersContent.carInfoId);

  if(followersContent.count){
    car.carStats.followersCount.count = followersContent.count;
  }

  if(followersContent.loadPending !== undefined) {
    car.carStats.followersCount.loadPending = followersContent.loadPending;
  }

  return {...state}
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

  if (car) {
    if (carContent.type === 'Images') {

      if (car.carImages) {
        carContent.content.forEach(item => {
          if (car.carImages.content.includes(item) === false) {
            car.carImages.content.push(item)
          }
        })
        car.carImages.loadPending = false;
      }
      else {
        // @TODO this doesn't look defined anywhere
       // Object.assign(car, getCarImageContent(carContent));
      }

    }
    else {

      if (car.carVideos) {
        carContent.content.forEach(item => {
          if (car.carVideos.content.includes(item) === false) {
            car.carVideos.content.push(item)
          }
        })
        car.carVideos.loadPending = false;
      }
      else {
        // @TODO this doesn't look defined anywhere
        //Object.assign(car, getCarVideoContent(carContent));
      }
    }

    return { ...state };
  }
  else {
    return state;
  }
}

export const cars = (state = initialState, action) => {
  const { type, userCars, carInfo, ownerInfo, carContent, followContent, followersContent } = action

  switch (type) {

    case ADD_CAR:
      return {
        userCars: state.userCars.push(),
        carToConfirm: null
      }

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

    default:
      return state
  }
}
