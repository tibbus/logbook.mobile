import { fetcher } from './fetch'
import { api } from './config'

const baseUri = api + 'user/{userId}/usercar/'

export const getUserCars = fetcher(baseUri + 'details={details}')
export const createUserCar = fetcher(baseUri + 'registration/{registration}', 'POST')
export const deleteUserCar = fetcher(baseUri + '{userCarId}')
