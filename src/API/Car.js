import { fetcher } from './fetch'
import { api } from './config'

export const getCarByRegistration = fetcher(api + 'car/registration/{registration}')

export const getCarImages = fetcher(api + 'timeline/{carInfoId}?contentType=Image&skip={skip}&take={take}')
export const getCarVideos = fetcher(api + 'timeline/{carInfoId}?contentType=Video&skip={skip}&take={take}')
export const followCar = fetcher(api + 'user/{userId}/follow/car/{carInfoId}')
export const unfollowCar = fetcher(api + 'user/{userId}/unfollow/car/{carInfoId}')
