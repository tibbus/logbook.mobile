import {
  deleteStatus as deleteStat,
  updateStatus as update
} from '../API/Status'
import {
  deleteImage as deleteIm
} from '../API/Image'

import {
  DELETE_IMAGE,
  DELETE_STATUS,
  UPDATE_STATUS
} from './Types'

export const deleteStatus = (id, carInfoId) => {
  const post = { id, carInfoId }
  return dispatch => deleteStat({}, post)
      .then(() => dispatch({ type: DELETE_STATUS, post }))
}

export const deleteImage = (id, carInfoId) => {
  const post = { id, carInfoId }

  return dispatch => deleteIm({}, post)
      .then(() => dispatch({ type: DELETE_IMAGE, post }))
}

const deleteMethods = {
  deleteImage, deleteStatus
}

export const deletePost = (id, carInfoId, mediaType = 'Status') => {
  return deleteMethods[`delete${mediaType}`](id, carInfoId)
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
