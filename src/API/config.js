const CURRENT_ENV = 'dev'
const API_VERSION = 1
const STREAM_API_VERSION = '1.0'

const environments = {
  dev: {
    uri: 'mycarbioservice.azurewebsites.net',
    authUri: 'mycarbioidentity.azurewebsites.net',
    getStreamUri: 'https://api.getstream.io',
    getStreamApiKey: '8r2y2gbevg9j',
    getStreamFetchLimit: 10,
    secure: false
  }
}

export const getEnvironment = env => {
  const { secure, uri } = environments[env || CURRENT_ENV]
  const protocol = secure ? 'https' : 'http'
  return `${protocol}://${uri}/`;
}

export const getIdentityEnvironment = env => {
  const { secure, authUri } = environments[env || CURRENT_ENV]
  const protocol = secure ? 'https' : 'http'
  return `${protocol}://${authUri}/`;
}

export const getStreamEnvironment = env => {
  const { getStreamUri } = environments[env || CURRENT_ENV]
  return `${getStreamUri}/`;
}

export const getStreamApiKey = env => {
  const { getStreamApiKey } = environments[env || CURRENT_ENV]
  return `${getStreamApiKey}`;
}

export const getStreamFetchLimit = env => {
  const { getStreamFetchLimit } = environments[env || CURRENT_ENV]
  return getStreamFetchLimit;
}

export const api = `api/v${API_VERSION}/`
export const getStreamApi = `api/v${STREAM_API_VERSION}/`
