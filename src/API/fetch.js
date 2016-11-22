import { store } from '../store'
import { getEnvironment } from './config'
import { replaceParams } from '../Utils'

const getUrl = (uri, uriParams = {}) => {
  const env = getEnvironment()
  if (uriParams) {
    return env + replaceParams(uri, uriParams, encodeURIComponent)
  }

  return env + uri
}

const customParams = (files, request) => {
  const { body } = request
  if (files) {
    const keys = Object.keys(body)
    const formData = new global.FormData()

    keys.forEach(key => formData.append(key, body[key]))
    return {
      body: formData,
      customHeaders: {}
    }
  }

  return {
    body: JSON.stringify(body),
    customHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export const fetcher = (uri, method = 'GET', files = false) => (request = {}, uriParams) => {
  const { user } = store.getState()
  //const { token = {}, id } = user
  //const { tokenType, accessToken } = token
  //const Authorization = `${tokenType} ${accessToken}`
  const { headers = {} } = request
  const url = getUrl(uri, Object.assign({}, uriParams, { userId: 1 }))

  const { body, customHeaders } = customParams(files, request)
  const requestObject = {
    method,
    body,
    headers: {
      ...customHeaders,
      ...headers,
      //Authorization
    }
  }

  return global
    .fetch(url, requestObject)
    .then(response => {
      const type = response.headers.get('content-type')

      if (!response.ok) {
        throw new Error('Bad Response')
      }

      if (type && type.match(/application\/json/ig)) {
        return response.json()
      }

      return {}
    })
}

export const getUser = fetcher('api/v1/user')

export const endSession = fetcher('identity/connect/endsession')
