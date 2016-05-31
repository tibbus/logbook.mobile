import { store } from '../App'
import { getEnvironment } from './config'
import { replaceParams } from '../Utils'

const getUrl = (uri, uriParams = {}) => {
  const env = getEnvironment()
  if (uriParams) {
    return env + replaceParams(uri, uriParams, encodeURIComponent)
  }

  return env + uri
}

const stringifyBody = (request = {}) => {
  const { body } = request
  if (body) {
    return { ...request, body: JSON.stringify(body) }
  }

  return request
}

export const fetcher = (uri, method = 'GET') => (request = {}, uriParams) => {
  const { user } = store.getState()
  const { token = {}, id } = user
  const { tokenType, accessToken } = token
  const Authorization = `${tokenType} ${accessToken}`
  const { headers = {} } = request
  const url = getUrl(uri, Object.assign({}, uriParams, { userId: id }))
  console.info(url)
  const requestObject = {
    method,
    ...stringifyBody(request),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers,
      Authorization
    }
  }

  return global
    .fetch(url, requestObject)
    .then(response => {
      const type = response.headers.get('content-type')
      console.info(type)
      if (!response.ok) {
        throw new Error('Bad Response')
      }

      if (type && type.match(/application\/json/ig)) {
        return response.json()
      }

      return {}
    })
}

export const getUser = fetcher('identity/connect/userinfo')

export const endSession = fetcher('identity/connect/endsession')
