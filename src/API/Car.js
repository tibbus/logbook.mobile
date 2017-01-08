import { fetcher } from './fetch'
import { api } from './config'

export const getCarByRegistration = fetcher(api + 'car/registration/{registration}')
