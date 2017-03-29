import {
  ATTEMPT_OIDC_AUTH,
  INVALIDATE_USER,
  SET_AUTH,
  SET_AUTH_ERROR,
  SET_USER,
  SET_USER_FOLLOW_COUNT,
  SET_USER_CAR_COUNT,
  SET_USER_FOLLOWING
} from '../Actions/Types'

const initialState = {
  attemptingOIDC: false,
  authService: '',
  name: 'Guest',
  token: null,
  profileImg: 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png',
  coverImg: 'https://images.designtrends.com/wp-content/uploads/2015/11/07122458/Car-Backgrounds.jpg',
  followCount: 0,
  carCount: 0,
  follows: []
}
// follows array contains the id's of cars.

export const user = (state: any = initialState, action) => {
  const { type, user, token, count, follows } = action

  switch (type) {
    case INVALIDATE_USER:
      return {
        ...state,
        token: null,
        tokenExpired: true
      }
    case SET_AUTH:
      return {
        ...state,
        token,
        authError: false,
        attemptingOIDC: !!state.user
      }
    case SET_AUTH_ERROR:
      const { error } = action
      return {
        ...state,
        attemptingOIDC: false,
        authError: error
      }
    case ATTEMPT_OIDC_AUTH:
      return {
        ...state,
        attemptingOIDC: true,
        authService: action.authService
      }
    case SET_USER:
      return {
        ...state,
        ...user,
        token: state.token,
        attemptingOIDC: false
      }
    case SET_USER_FOLLOW_COUNT:
      return {
        ...state,
        followCount: count
      }
    case SET_USER_CAR_COUNT:
      return {
        ...state,
        carCount: count
      }
    case SET_USER_FOLLOWING:
      return {
        ...state,
        follows: follows
      }
    default:
      return state
  }
}