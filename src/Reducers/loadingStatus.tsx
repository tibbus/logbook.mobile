import {
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS
} from '../Actions/Types'

const initialState = {
  carsLoading: false,
  profileLoading: false
}

const setLoading = (state, resourceName, status) => {
  switch (resourceName) {
    case 'cars':
      return { ...state, carsLoading: status }
    default:
      return state
  }
}

export const loadingStatus = (state = initialState, action) => {
  const { type, resourceName } = action
  switch (type) {
    case SET_LOADING_STATUS:
      return setLoading(state, resourceName, true)

    case UNSET_LOADING_STATUS:
      return setLoading(state, resourceName, false)

    default:
      return state
  }
}
