import { fetcher } from './fetch'
import { api } from './config'

const baseUri = api + 'user/{userId}/usercar/'

export const getUserCars = fetcher(baseUri + 'details={details}')
export const confirmUserCar = fetcher(baseUri + 'add/{carInfoId}', 'POST')
export const deleteUserCar = fetcher(baseUri + '{userCarId}')
