import {
  deleteStatus,
  updateStatus as update
} from '../API/Status'
import { deleteImage } from '../API/Image'
import { deleteVideo } from '../API/Video'

import {
  DELETE_TIMELINE_ITEM,
  UPDATE_TIMELINE_ITEM
} from './Types'

const deleteMethods = {
  deleteImage, deleteStatus, deleteVideo
}

export const deletePost = (id, carInfoId, type = 'Status') => {
  const item = { id, carInfoId, type }
  const apiMethod = deleteMethods[`delete${type}`]
  return dispatch => apiMethod({}, item)
      .then(() => dispatch({ type: DELETE_TIMELINE_ITEM, item }))
}

export const updateStatus = (id, carInfoId, item) => dispatch => {
  const details = { id, carInfoId }
  dispatch({
    type: UPDATE_TIMELINE_ITEM,
    item: { details, type: 'Status' },
    pending: true
  })
  update({ body: item }, { id, carInfoId })
    .then(itemDetails => {
      dispatch({
        type: UPDATE_TIMELINE_ITEM,
        item: {
          type: 'Status',
          details: itemDetails
        }
      })
    })
    .catch((...args) => console.log(...args))
}
