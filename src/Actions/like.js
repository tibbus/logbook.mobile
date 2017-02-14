import { getUserLikedPosts as getLikedPosts } from '../API/Like'
import { SET_USER_LIKED_ITEMS } from './Types'

export const getUserLikedPosts = (userId) => dispatch => {
  getLikedPosts({}, {userId})
  .then(retrievedPostIds => dispatch({
      type: SET_USER_LIKED_ITEMS,
      likedItems: retrievedPostIds.likedItems
    })
  )
  .catch((...args) => console.log(...args));
}

/*export const likePost = (id, carInfoId, postType, item, userId, likeType) => dispatch => {
  const details = { id, carInfoId }
  likePost({
    'PostId': id,
    'PostType': postType,
    'UserId': item.userId 
  })

}*/