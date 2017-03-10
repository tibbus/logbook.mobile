import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_USER_CAR_CONTENT,
  
} from '../Actions/Types'

/*
browsingCars:[
  {
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

const getCarImageContent = (carContent) => {
    return {
      carInfo: carContent.carInfo,
      carImages: {
        content: carContent.content,
        loadPending: false
      }
    };
}

const getCarVideoContent = (carContent) => {
    return {
      carInfo: carContent.carInfo,
      carVideos: {
        content: carContent.content,
        loadPending: false
      }
    };
}

const updateCarFollowFlag = (state, followContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === followContent.carInfoId);
  car.followed = followContent.following;

  return state;
}
const updateBrowsingCarContent = (state, carContent) => {
  const car = state.browsingCars.find(browsingCar => browsingCar.carInfo.id === carContent.carInfo.id);

  if(car) {
    if(carContent.type === 'Images') {

      if(car.carImages) {
        car.carImages.content.push(carContent.content);
        car.carImages.loadPending = false;
      }
      else {
        Object.assign(car, getCarImageContent(carContent));
      }
    }
    else {

      if(car.carVideos) {
        car.carVideos.content.push(carContent.content);
        car.carVideos.loadPending = false;
      }
      else {
        Object.assign(car, getCarVideoContent(carContent));
      }
    }

    return state;
  }
  else {
    if(carContent.type === 'Images') {
      const car = getCarImageContent(carContent);
      state.browsingCars.push(car);
      return state;
    }
    else {
      const car = getCarVideoContent(carContent);
      state.browsingCars.push(car);
      return state;
    }
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

     case UPDATE_USER_CAR_CONTENT:
      return updateBrowsingCarContent(state, carContent)

    case FOLLOW_CAR:
      return updateCarFollowFlag(state, followContent)
       
    default:
      return state
  }
}
