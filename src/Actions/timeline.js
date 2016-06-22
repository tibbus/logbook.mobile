import {
  ADD_TIMELINE,
  ADD_TIMELINE_IMAGE,
  ADD_TIMELINE_STATUS
} from './Types'
import { getTimeline } from '../API/Timeline'
import { createStatus } from '../API/Status'
import { createImage } from '../API/Image'

export const setCarTimeline = ({
  carInfoId
}) => {
  return dispatch => {
    getTimeline({}, { carInfoId })
      .then(data => {
        const { results } = data
        dispatch({
          carInfoId,
          timeline: results,
          type: ADD_TIMELINE
        })
      })
      .catch(e => {
        // TODO Handle timeline init failure
      })
  }
}

const addStatus = (carInfoId, details, pending) => ({
  carInfoId,
  type: ADD_TIMELINE_STATUS,
  data: {
    type: 'Status',
    details
  },
  pending
})

export const addCarTimelineStatus = ({
  carInfoId,
  description
}) => {
  const body = { description, topics: [] }
  const request = { body }

  return dispatch => {
    dispatch(details => dispatch(addStatus(carInfoId, body, true)))
    createStatus(request, { carInfoId })
      .then(details => {
        dispatch(addStatus(carInfoId, details))
      })
      .catch(console.info)
  }
}

const addImage = (carInfoId, details, pending) => ({
  carInfoId,
  type: ADD_TIMELINE_IMAGE,
  data: {
    type: 'Image',
    details
  },
  pending
})

export const addCarTimelineImage = ({
  carInfoId,
  description = '',
  image,
  location = ''
}) => {
  const { uri, ext = '', id } = image
  const extLower = ext.toLowerCase()
  const type = `image/${extLower}`
  const name = `${id}.${extLower}`
  const request = {
    body: {
      description,
      location,
      files: { uri, type, name },
      topics: []
    }
  }

  return dispatch => {
    // TODO handle image create error
    createImage(request, { carInfoId })
      .then(data => dispatch(addImage(carInfoId, data)))
      .catch(console.error)
  }
}
