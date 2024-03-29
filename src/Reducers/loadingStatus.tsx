import {
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS
} from '../Actions/Types'

const initialState = {
  carsLoading: false,
  verifyingUserCar: false,
  addingUserCar: false,
  updatingUserCar: false,
  profileLoading: false,
  addPostLoading: false,
  invitesLoading: false
}

const setLoading = (state, resourceName, status) => {
  switch (resourceName) {
    case 'cars':
      return { ...state, carsLoading: status }
    case 'verifyUserCar':
      return { ...state, verifyingUserCar: status }
    case 'addUserCar':
      return { ...state, addingUserCar: status }
    case 'updateUserCar':
      return { ...state, addPostLoading: status }
    case 'addPost':
      return { ...state, addPostLoading: status }
    case 'invites':
      return { ...state, invitesLoading: status}
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
