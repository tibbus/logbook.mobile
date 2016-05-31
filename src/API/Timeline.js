import { fetcher } from './fetch'
import { api } from './config'

export const getTimeline = fetcher(api + 'timeline/{carInfoId}')
