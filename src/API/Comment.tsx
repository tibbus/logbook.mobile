import { fetcher } from './fetch'
import { api } from './config'

const uri = `${api}timeline/{timelinePostId}/comment`
const uriIdParam = `${uri}/{id}`

export const getComment = fetcher(uri, 'GET')
export const createComment = fetcher(uri, 'POST')
export const updateComment = fetcher(uriIdParam, 'PUT')
export const deleteComment = fetcher(uriIdParam, 'DELETE')
