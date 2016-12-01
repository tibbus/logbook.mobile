import {
  ADD_TIMELINE,
  ADD_TIMELINE_ITEM,
  PAUSE_TIMELINE_VIDEO,
  PLAY_TIMELINE_VIDEO
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
    getTimeline(carInfoId , { carInfoId })
      .then(data => {
        const { results } = data
        dispatch(addTimelineAction(carInfoId, results))
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

const formatFile = (mediaType, file) => {
  const { uri, ext = '', id } = file
  const extLower = ext.toLowerCase()
  const type = `${mediaType}/${extLower}`
  const name = `${id}.${extLower}`
  return { uri, type, name }
}

const fileRequest = (mediaType, location, description, file) => ({
  body: {
    description,
    location,
    files: formatFile(mediaType, file),
    topics: []
  }
})

export const addCarTimelineImage = ({
  carInfoId,
  description = '',
  image,
  location = ''
}) => dispatch =>
    // TODO handle image create error
    createImage(fileRequest('image', location, description, image), { carInfoId })
      .then(data => dispatch(addTimelineItemAction(carInfoId, data, 'Image')))
      .catch(console.error)

export const addCarTimelineVideo = ({
  carInfoId,
  description = '',
  video,
  location = ''
}) => dispatch =>
    // TODO handle video create error
    createVideo(fileRequest('video', location, description, video), { carInfoId })
      .then(data => dispatch(addTimelineItemAction(carInfoId, data, 'Video')))
      .catch(console.error)
