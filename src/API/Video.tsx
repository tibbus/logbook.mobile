import { fetcher } from './fetch'
import { api } from './config'

const uri = `${api}car/{carInfoId}/video`
const uriIdParam = `${uri}/{id}`

export const createVideo = fetcher(uri, 'POST', true)
export const updateVideo = fetcher(uriIdParam, 'PUT', true)
export const deleteVideo = fetcher(uriIdParam, 'DELETE')
