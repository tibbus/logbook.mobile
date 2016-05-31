import {
  UPDATE_STATUS
} from '../Actions/Types'

export const statusReducer = (state = {}, action) => {
  const { type, status, pending = false } = action

  switch (type) {
    case UPDATE_STATUS:
      return {
        ...state,
        pending,
        details: {
          ...state.details,
          ...status
        }
      }

    default:
      return state
  }
}
