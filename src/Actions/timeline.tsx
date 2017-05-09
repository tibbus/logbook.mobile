import {
  ADD_TIMELINE,
  ADD_TIMELINE_ITEM,
  PAUSE_TIMELINE_VIDEO,
  PLAY_TIMELINE_VIDEO,
  POST_PUBLISHED,
  SET_LOADING_STATUS,
  UNSET_LOADING_STATUS
} from './Types'
import { getTimeline } from '../API/Timeline'
import { createStatus } from '../API/Status'
import { createImage } from '../API/Image'
import { createVideo } from '../API/Video'

const addTimelineAction = (carInfoId, timeline) => ({
  carInfoId,
  timeline,
  type: ADD_TIMELINE
})

const addTimelineItemAction = (carInfoId, details, postType, pending = false) => ({
  carInfoId,
  type: ADD_TIMELINE_ITEM,
  data: {
    type: postType,
    details
  },
  pending
})

export const pauseVideoAction = (carInfoId, postId) => ({
  carInfoId, postId, type: PAUSE_TIMELINE_VIDEO
})

export const playVideoAction = (carInfoId, postId) => ({
  carInfoId, postId, type: PLAY_TIMELINE_VIDEO
})

export const setCarTimeline = ({
  carInfoId
}) => {
  return dispatch => {
    getTimeline('car', carInfoId)
      .then(data => {
        dispatch(addTimelineAction(carInfoId, data))
      })
      .catch(e => {
        // TODO Handle timeline init failure
      })
  }
}

export const addCarTimelineStatus = (carInfoId, description, onSuccess, onFailure ) => {
  const body = { description, topics: [] }
  const request = { body }

  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'addPost' })
    dispatch(details => dispatch(addTimelineItemAction(carInfoId, body, 'Status', true)))
    createStatus(request, { carInfoId })
      .then(details => {
        dispatch(addTimelineItemAction(carInfoId, details, 'Status'))
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
        onSuccess();
      })
      .catch(error => {
        console.log(error);
        onFailure();
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
      })
  }
}

const formatFiles = (mediaType, files) => {
  const formattedFiles = files.map((file) => {
    const { uri, extension = '', id } = file
    const extLower = extension.toLowerCase()
    const type = `${mediaType}/${extLower}`
    const name = `${id}.${extLower}`
    return { uri, type, name }
  })

  return formattedFiles;
}

const fileRequest = (mediaType, location, description, files, tags) => ({
  body: {
    description,
    location,
    files: formatFiles(mediaType, files),
    topics: tags
  }
})

export const addCarTimelinePost = (request, onSuccess, onFailure) => {
  if (request.postType === 'image') {
    return addCarTimelineImage(request, onSuccess, onFailure);
  }
  else if (request.postType === 'video') {
    return addCarTimelineVideo(request, onSuccess, onFailure);
  }
  else {
    return addCarTimelineStatus(request.carInfoId, request.description, onSuccess, onFailure)
  }
}

export const addCarTimelineImage = (postDetails, onSuccess, onFailure) => {

  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'addPost' })
    // TODO handle image create error
    const { carInfoId, description, tags } = postDetails;
    createImage(fileRequest('image', '', description, postDetails.content.data, tags), { carInfoId })
      .then(data => {
        dispatch(addTimelineItemAction(carInfoId, data, 'Image'))
        dispatch({
          type: POST_PUBLISHED,
          publishPending: false,
          published: true
        })
        dispatch({
          type: 'RESET_POST'
        })
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
        onSuccess();
      })
      .catch((args) => {
        console.log(args)
        dispatch({
          type: POST_PUBLISHED,
          publishPending: false,
          published: false
        })
        onFailure();
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
      })
  }
}

export const addCarTimelineVideo = (postDetails, onSuccess, onFailure) => {

  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, resourceName: 'addPost' })
    // TODO handle video create error
    const { carInfoId, description, tags } = postDetails;
    createVideo(fileRequest('video', '', description, postDetails.content.data, tags), { carInfoId })
      .then(data => {
        dispatch(addTimelineItemAction(carInfoId, data, 'Video'))
        dispatch({
          type: POST_PUBLISHED,
          publishPending: false,
          published: true
        })
        dispatch({
          type: 'RESET_POST'
        })
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
        onSuccess();
      })
      .catch((args) => {
        console.log(args)
        dispatch({
          type: POST_PUBLISHED,
          publishPending: false,
          published: false
        })
        onFailure();
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'addPost' });
      })
  }
}

