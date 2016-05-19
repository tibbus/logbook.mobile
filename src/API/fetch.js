import { store } from '../App'
import { getEnvironment } from './config'
import { replaceParams } from '../Utils'

const getUrl = (uri, uriParams = {}) => {
  const env = getEnvironment()
  if (uriParams) {
    return env + replaceParams(uri, uriParams)
  }

  return env + uri
}

export const fetcher = (uri, method = 'GET') => (request = {}, uriParams) => {
  const { user } = store.getState()
  const { token = {} } = user
  const { tokenType, accessToken } = token
  const Authorization = `${tokenType} ${accessToken}`
  const { headers = {} } = request
  const url = getUrl(uri, uriParams)
  const requestObject = {
    method,
    ...request,
    headers: {
      ...headers,
      Authorization
    }
  }
  return global.fetch(url, requestObject).then(response => response.json())
}

export const getUser = fetcher('identity/connect/userinfo')

export const endSession = fetcher('identity/connect/endsession')
