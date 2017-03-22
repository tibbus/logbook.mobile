import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'car/{carInfoId}/status'
const uriIdParam = uri + '/{id}'

export const createStatus = fetcher(uri, 'POST')
export const getStatuses = fetcher(uri)
export const getStatus = fetcher(uriIdParam)
export const updateStatus = fetcher(uriIdParam, 'PUT')
export const deleteStatus = fetcher(uriIdParam, 'DELETE')
