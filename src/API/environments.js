const CURRENT_ENV = 'dev'

const environments = {
  dev: {
    uri: 'amilatestapi-dev.azurewebsites.net',
    secure: false
  }
}

export const getEnvironment = () => {
  const { secure, uri } = environments[CURRENT_ENV]
  const protocol = secure ? 'https' : 'http'
  return `${protocol}://${uri}/`
}

