import { store } from '../App'
import { getEnvironment } from './environments'

export const fetcher = (uri, method) => (request = {}) => {
  const { user } = store.getState()
  const { token = {} } = user
  const { tokenType, accessToken } = token
  const Authorization = `${tokenType} ${accessToken}`
  const { headers = {} } = request
  const url = getEnvironment() + uri
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

