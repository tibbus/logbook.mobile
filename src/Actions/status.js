import {
  deleteStatus as deleteStat,
  updateStatus as update
} from '../API/Status'
import { DELETE_STATUS, UPDATE_STATUS } from './Types'

export const deleteStatus = (id, carInfoId) => {
  return dispatch => {
    deleteStat({}, { id, carInfoId })
      .then(() => {
        dispatch({
          type: DELETE_STATUS,
          status: { id, carInfoId }
        })
      })
  }
}

export const updateStatus = (id, carInfoId, status) => {
  return dispatch => {
    dispatch({
      type: UPDATE_STATUS,
      status: { carInfoId, id },
      pending: true
    })
    update({ body: status }, { id, carInfoId })
      .then(status => {
        dispatch({
          type: UPDATE_STATUS,
          status
        })
      })
      .catch(console.log)
  }
}
