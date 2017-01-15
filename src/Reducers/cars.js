import {
  ADD_CAR,
  SET_USER_CARS,
  SEARCHED_CAR
} from '../Actions/Types'

const initialState = {
    userCars:[],
    carToConfirm: null  
}

export const cars = (state = initialState, action) => {
  const { type, userCars, carInfo } = action

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

    default:
      return state
  }
}
