import { fetcher } from './fetch'
import { api } from '../config'

export const createCar = fetcher(api + 'user/{userId}/usercar/registration/{registration}')
