import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'car/{carInfoId}/event'
const uriIdParam = uri + '/{id}'

export const createEvent = fetcher(uri, 'POST')
export const getEvent = fetcher(uriIdParam)
export const updateEvent = fetcher(uriIdParam, 'PUT')
export const deleteEvent = fetcher(uriIdParam, 'DELETE')
