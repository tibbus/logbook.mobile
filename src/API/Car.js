import { fetcher } from './fetch'
import { api } from './config'

export const getCar = fetcher(api + 'car/registration/{registration}')
