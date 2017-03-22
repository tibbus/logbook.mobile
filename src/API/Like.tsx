import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'timeline/likes'
const getUserLikedPostsUri = uri + '/query/userlikedposts?userId={userId}'
const deleteTimelineLikeUri = uri + '/timeline/like/{id}'
const deleteCommentLikeUri = uri + '/comment/like/{id}'

export const likeItem = fetcher(uri, 'POST')
export const getUserLikedPosts = fetcher(getUserLikedPostsUri, 'GET')
export const unlikeTimelineItem = fetcher(deleteTimelineLikeUri, 'DELETE')
export const unlikeCommentItem = fetcher(deleteCommentLikeUri, 'DELETE')