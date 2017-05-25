import { fetcher } from './fetch'
import { api } from './config'

export const getCarByRegistration = fetcher(api + 'car/registration/{registration}')
export const getCarById = fetcher(api + 'car/{carInfoId}/details')
export const getCarOwnerById = fetcher(api + 'car/{carInfoId}/user')

export const getCarImages = fetcher(api + 'timeline/{carInfoId}?contentType=Image&skip={skip}&take={take}')
export const getCarVideos = fetcher(api + 'timeline/{carInfoId}?contentType=Video&skip={skip}&take={take}')
export const followCar = fetcher(api + 'user/{userId}/follow/car/{carInfoId}', 'POST')
export const unFollowCar = fetcher(api + 'user/{userId}/unfollow/car/{carInfoId}', 'POST')
export const updateProfileImage = fetcher(api + '/car/{id}/profile/image', 'POST', true)