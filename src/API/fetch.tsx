import { store } from '../store';
import { getEnvironment, getIdentityEnvironment } from './config';
import { replaceParams } from '../Utils';

const getUrl = (uri, uriParams = {}, identity = false) => {

  const env = identity ? getIdentityEnvironment() : getEnvironment()

  if (uriParams) {
    return env + replaceParams(uri, uriParams)
  }

  return env + uri
}

const customParams = (files, request) => {
  const { body } = request
  if (files) {
    const keys = Object.keys(body)
    const formData = new FormData()

    keys.forEach(key => {

      if (key === 'files' || key === 'topics') {
        body[key].forEach(item => formData.append(key, item));
      }
      else {
        formData.append(key, body[key])
      }

    })
    return {
      body: formData,
      customHeaders: {
        'Content-Type': 'multipart/form-data'
      }
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

export const fetcher = (uri, method = 'GET', files = false, identity = false) => (request = {}, uriParams?) => {
  const { user }: any = store.getState()
  const { token = {}, id } = user
  const { tokenType, accessToken }: any = token
  const Authorization = `${tokenType} ${accessToken}`
  const { headers = {} }: any = request;
  const url = getUrl(uri, Object.assign({}, uriParams, { userId: id }), identity)

  const { body, customHeaders } = customParams(files, request)
  const requestObject = {
    method,
    body,
    headers: {
      ...customHeaders,
      ...headers,
      Authorization
    }
  }

  return fetch(url, requestObject)
    .then(response => {
      if (!response.ok) {
        throw new Error('Bad Response')
      }

      // Allow empty body response
      // @todo : should be fixed on the BE to never send an empty response
      return response.text().then(text => text ? JSON.parse(text) : {});
    });
}

export const getUser = fetcher('connect/userinfo', 'GET', false, true);

export const endSession = fetcher('connect/endsession', 'GET', false, true);
