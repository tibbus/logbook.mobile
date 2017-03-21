import { getUserLikedPosts as getLikedPosts, likeItem, unlikeTimelineItem } from '../API/Like';
import { SET_USER_LIKED_ITEMS, ADD_USER_LIKED_ITEM, REMOVE_USER_LIKED_ITEM } from './Types';

export const getUserLikedPosts = (userId) => dispatch => {
  getLikedPosts({}, { userId })
    .then(retrievedPostIds => dispatch({
      type: SET_USER_LIKED_ITEMS,
      likedItems: retrievedPostIds.likedItems
    })
    )
    .catch((...args) => console.log(args));
}

export const likePost = (postId, postType, userId, carInfoId) => dispatch => {

  const likeBody = {
    'PostId': postId,
    'PostType': postType,
    'UserId': userId
  };
  likeItem({ body: likeBody })
    .then(likedPost => {
      dispatch({
        type: ADD_USER_LIKED_ITEM,
        updatedItem: { id: likedPost.id, postId: likedPost.postId, carInfoId: carInfoId }
      })
    })
    .catch((...args) => console.log(args));
}

export const unlikeTimelinePost = (id, postId, carInfoId) => dispatch => {

  unlikeTimelineItem({}, { id })
    .then(unlikedPost => {
      dispatch({
        type: REMOVE_USER_LIKED_ITEM,
        updatedItem: { id: id, postId: postId, carInfoId: carInfoId }
      })
    })
    .catch((...args) => console.log(args))
};