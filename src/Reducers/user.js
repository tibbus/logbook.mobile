import {
  ATTEMPT_OIDC_AUTH,
  INVALIDATE_USER,
  SET_AUTH,
  SET_AUTH_ERROR,
  SET_USER
} from '../Actions/Types'

const initialState = {
  attemptingOIDC: false,
  name: 'Guest',
  token: null,
  profileImg: 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png'
}

export const user = (state = initialState, message) => {
  const { type, user, token } = message

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
        attemptingOIDC: false
      }
    case SET_AUTH_ERROR:
      return {
        ...state,
        attemptingOIDC: false
      }
    case ATTEMPT_OIDC_AUTH:
      return {
        ...state,
        attemptingOIDC: true
      }
    case SET_USER:
      return {
        ...state,
        ...user,
        token: state.token
      }
    default:
      return state
  }
}
