import {
  ADD_CAR,
  SET_USER_CARS
} from '../Actions/Types'

const initialState = null

// const car = (state, action) => {
//   const { type, carId } = action
//
//   switch (type) {
//
//     case ADD_CAR:
//       return state
//
//     default:
//       return state
//   }
// }

export const cars = (state = initialState, action) => {
  const { type, userCars } = action

  switch (type) {

    case ADD_CAR:
      return state

    case SET_USER_CARS:
      return userCars

    default:
      return state
  }
}
