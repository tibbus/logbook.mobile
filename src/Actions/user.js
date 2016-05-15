import { getUser } from '../API/fetch'
import { SET_USER } from './Types'

export const setUserProfile = () => {
  return dispatch => (
    getUser()
      .then(user => dispatch({
        type: SET_USER,
        user
      }))
  )
}
