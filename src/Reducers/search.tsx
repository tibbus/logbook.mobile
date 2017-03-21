import {
  CARS_SEARCHED,
} from '../Actions/Types'

const initialState = [];

export const search = (state = initialState, action) => {
  const { type, value } = action

  switch (type) {

    case CARS_SEARCHED:
        return value;

    default:
      return state
  }
}