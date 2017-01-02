import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'timline/likes'
const deleteTimelineLikeUri = api + 'timeline/likes/timeline/like/{id}'
const deleteCommentLikeUri = api + 'timeline/likes/comment/like/{id}'

export const likePost = fetcher(uri, 'POST')
export const unlikeTimelinePost = fetcher(deleteTimelineLikeUri, 'DELETE')
export const unlikeCommentPost = fetcher(deleteCommentLikeUri, 'DELETE')