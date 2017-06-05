import { fetcher } from './fetch'
import { api } from './config'

export const getInviteByReference = fetcher(api + 'invite/{inviteReference}', 'GET', false, false, false)
export const postInviteRequest = fetcher(api + 'invite/request', 'POST', false, false, false)