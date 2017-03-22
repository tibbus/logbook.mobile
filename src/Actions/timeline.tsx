import {
  ADD_TIMELINE,
  ADD_TIMELINE_ITEM,
  PAUSE_TIMELINE_VIDEO,
  PLAY_TIMELINE_VIDEO,
  POST_PUBLISHED
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
    getTimeline('car', carInfoId , { carInfoId })
      .then(data => {
        dispatch(addTimelineAction(carInfoId, data))
      })
      .catch(e => {
        // TODO Handle timeline init failure
      })
  }
}

export const addCarTimelineStatus = ({
  carInfoId,
  description
}) => {
  const body = { description, topics: [] }
  const request = { body }

  return dispatch => {
    dispatch(details => dispatch(addTimelineItemAction(carInfoId, body, 'Status', true)))
    createStatus(request, { carInfoId })
      .then(details => {
        dispatch(addTimelineItemAction(carInfoId, details, 'Status'))
      })
      .catch(console.info)
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

export const addCarTimelinePost = (request) => {
  if (request.postType === 'image') {
    return addCarTimelineImage(request);
  }
  else if (request.postType === 'video') {
    return addCarTimelineVideo(request);
  }
  else {
    return addCarTimelineStatus(request)
  }
}

export const addCarTimelineImage = (postDetails) => {

  return dispatch => {
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
      })
      .catch((args) => {
        console.log(args)
        dispatch({
          type: POST_PUBLISHED,
          publishPending: false,
          published: false
        })
      })
  }
}

export const addCarTimelineVideo = (postDetails) => {

  return dispatch => {
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
      })
      .catch((args) => {
        console.log(args)
        dispatch({
          type: POST_PUBLISHED,
          publishPending: false,
          published: false
        })
      })
  }
}

