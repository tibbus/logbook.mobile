import { fetcher } from './fetch'
import { api } from './config'

export const getCarByRegistration = fetcher(api + 'car/registration/{registration}')

export const getCarImages = fetcher(api + 'timeline/{carInfoId}?contentType=Image&skip={skip}&take={take}')
