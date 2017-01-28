import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR,
  UPDATE_USER_CAR_IMAGES
} from '../Actions/Types'

const initialState = {
    userCars:[],
    carToConfirm: null,
    carImages: [],
    carImagesLoadPending: true,
}

export const cars = (state = initialState, action) => {
  const { type, userCars, carInfo, carImages, carImagesLoadPending } = action

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
        carImages: carImages,
        carImagesLoadPending: carImagesLoadPending
      }   
    default:
      return state
  }
}
