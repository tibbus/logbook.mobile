const CURRENT_ENV = 'dev'
const API_VERSION = 1

const environments = {
  dev: {
    uri: 'mycarbioservice.azurewebsites.net',
    secure: false
  }
}

export const getEnvironment = env => {
  const { secure, uri } = environments[env || CURRENT_ENV]
  const protocol = secure ? 'https' : 'http'
  return `${protocol}://${uri}/`
}

export const api = `api/v${API_VERSION}/`
