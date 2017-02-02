const CURRENT_ENV = 'dev'
const API_VERSION = 1
const STREAM_API_VERSION = '1.0'
export const AZURE_SEARCH_API_VERSION = '2015-02-28'

const environments = {
  dev: {
    uri: 'mycarbioservice.azurewebsites.net',
    authUri: 'mycarbioidentity.azurewebsites.net',
    searchUri: 'https://mycarbiosearch.search.windows.net/indexes/',
    searchIndex: 'carinfostaging',
    searchApiKey: '56204AA4847BE7E6D4F8ACFB6502D7C6',
    getStreamUri: 'https://api.getstream.io',
    getStreamApiKey: '8r2y2gbevg9j',
    getStreamFetchLimit: 10,
    apiFetchLimit: 20,
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

export const getSearchEnvironment = env => {
  const { searchUri } = environments[env || CURRENT_ENV]
  return `${searchUri}/`;
}

export const getSearchIndex = env => {
  const { searchIndex } = environments[env || CURRENT_ENV]
  return `${searchIndex}/`;
}

export const getSearchApiKey = env => {
  const { searchApiKey } = environments[env || CURRENT_ENV]
  return `${searchApiKey}`;
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

export const getApiFetchLimit = env => {
  const { apiFetchLimit } = environments[env || CURRENT_ENV]
  return apiFetchLimit;
}

export const api = `api/v${API_VERSION}/`
export const getStreamApi = `api/v${STREAM_API_VERSION}/`
