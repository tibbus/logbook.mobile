import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_BROWSING_CAR_CONTENT,
  SET_BROWSING_CAR,
  FOLLOW_CAR  
} from '../Actions/Types'

/*
browsingCars:[
  {
    ownerInfo: {
      id: 1,
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
    followed: false
  }
]
*/
const initialState = {
    userCars:[],
    carToConfirm: null,
    browsingCars: [],
}

const updateCarFollowFlag = (state, followContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === followContent.carInfoId);
  car.followed = followContent.following;

  return {...state};
}

const setBrowsingCar = (state, carInfo) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carInfo.id)

  if(car) {
    return state;
  }

  const newCar = {
    carInfo: carInfo,
    carImages: {
      content: [],
      loadPending: true
    },
    carVideos: {
      content: [],
      loadPending: true
    },
    followed: false
  }
  state.browsingCars.push(newCar);

  return {...state};
}
const updateBrowsingCarContent = (state, carContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carContent.carInfoId);

  if(car) {
    if(carContent.type === 'Images') {

      if(car.carImages) {
        carContent.content.forEach(item => {
          if(car.carImages.content.includes(item) === false){
            car.carImages.content.push(item)
          }
        })
        car.carImages.loadPending = false;
      }
      else {
        Object.assign(car, getCarImageContent(carContent));
      }

    }
    else {

      if(car.carVideos) {
        carContent.content.forEach(item => {
          if(car.carVideos.content.includes(item) === false){
            car.carVideos.content.push(item)
          }
        })
        car.carVideos.loadPending = false;
      }
      else {
        Object.assign(car, getCarVideoContent(carContent));
      }
    }

    return {...state};
  }
  else {
    return state;
  }
}

export const cars = (state = initialState, action) => {
  const { type, userCars, carInfo, carContent, followContent } = action

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
      return updateBrowsingCarContent(state, carContent)

    case SET_BROWSING_CAR:
      return setBrowsingCar(state, carInfo)

    case FOLLOW_CAR:
      return updateCarFollowFlag(state, followContent)
       
    default:
      return state
  }
}
