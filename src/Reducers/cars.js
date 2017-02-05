import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_USER_CAR_IMAGES,
  UPDATE_USER_CAR_VIDEOS,
} from '../Actions/Types'

const initialState = {
    userCars:[],
    carToConfirm: null,
    carImages: [],
    carVideos: [],
    carDataLoadPending: true,
}

export const cars = (state = initialState, action) => {
  const { type, userCars, carInfo, carImages, carVideos, carDataLoadPending } = action

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
        carImages,
        carDataLoadPending
      }

    case UPDATE_USER_CAR_VIDEOS:
      return {
        ...state,
        carVideos,
        carDataLoadPending
      }    
    default:
      return state
  }
}
