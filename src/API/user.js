import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'user'
const uriId = uri + '/{id}'

export const createUser = fetcher(uri, 'POST')
export const getUsers = fetcher(uriId)
export const updateUser = fetcher(uriId, 'PUT')
export const getUserByEmail = fetcher(uri + 'email/{email}')
export const getFollowCount = fetcher(uriId + '/follows')
