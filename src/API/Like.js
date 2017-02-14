import { fetcher } from './fetch'
import { api } from './config'

const uri = api + 'timeline/likes/'
const getUserLikedPostsUri = uri + 'query/userlikedposts?userId={userId}'
const deleteTimelineLikeUri = uri + 'timeline/like/{id}'
const deleteCommentLikeUri = uri + 'comment/like/{id}'

export const likePost = fetcher(uri, 'POST')
export const getUserLikedPosts = fetcher(getUserLikedPostsUri, 'GET')
export const unlikeTimelinePost = fetcher(deleteTimelineLikeUri, 'DELETE')
export const unlikeCommentPost = fetcher(deleteCommentLikeUri, 'DELETE')