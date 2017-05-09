import {
  deleteStatus,
  updateStatus as update
} from '../API/Status'
import { deleteImage } from '../API/Image'
import { deleteVideo } from '../API/Video'

import {
  DELETE_TIMELINE_ITEM,
  UPDATE_TIMELINE_ITEM,
  UPDATE_POST,
  RESET_POST,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS
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
    .catch((...args) => console.log(args))
}

export const updateAddPost = (data, onSuccess) => dispatch => {

  dispatch({ type: SET_LOADING_STATUS, resourceName: 'addPost' })
  dispatch({
    type: UPDATE_POST,
    item: { data }
  });
  dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
  onSuccess();
  
}

export const resetAddPost = (onSuccess) => dispatch => {
  dispatch({ type: SET_LOADING_STATUS, resourceName: 'addPost' })
  dispatch({
    type: RESET_POST
  });
  dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
  onSuccess();
}
