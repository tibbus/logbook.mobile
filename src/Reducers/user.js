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

export const user = (state = initialState, action) => {
  const { type, user, token } = action

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
        attemptingOIDC: true
      }
    case SET_USER:
      return {
        ...state,
        ...user,
        token: state.token,
        attemptingOIDC: !!state.token
      }
    default:
      return state
  }
}
