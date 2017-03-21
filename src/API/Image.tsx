import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'car/{carInfoId}/image'
const uriIdParam = uri + '/{id}'

export const createImage = fetcher(uri, 'POST', true)
export const updateImage = fetcher(uriIdParam, 'PUT', true)
export const deleteImage = fetcher(uriIdParam, 'DELETE')
