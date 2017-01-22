import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_USER_CAR_IMAGES
} from '../Actions/Types'

const initialState = {
    userCars:[],
    carToConfirm: null,
    userCarImages: {
      carInfoId:null,
      images:[]
    }  
}

export const cars = (state = initialState, action) => {
  const { type, userCars, carInfo, userCarImages } = action

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

     case UPDATE_USER_CAR_IMAGES:
      return {
        ...state,
        userCarImages: userCarImages
      }   
    default:
      return state
  }
}
