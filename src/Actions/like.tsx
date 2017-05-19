import { getUserLikedPosts as getLikedPosts, likeItem, unlikeTimelineItem } from '../API/Like';
import { SET_USER_LIKED_ITEMS, ADD_USER_LIKED_ITEM, REMOVE_USER_LIKED_ITEM } from './Types';
import { dispatch } from '../store';

export const getUserLikedPosts = (userId) => () => {
  getLikedPosts({}, { userId })
    .then((retrievedPostIds: any) => dispatch({
      type: SET_USER_LIKED_ITEMS,
      likedItems: retrievedPostIds.likedItems
    })
    )
    .catch((...args) => console.log(args));
}

export const likePost = (postId, postType, userId, carInfoId, actorType) => () => {
  const actorId = actorType === 'car' ? carInfoId : userId;

  const likeBody = {
    'PostId': postId,
    'PostType': postType,
    'UserId': userId
  };
  likeItem({ body: likeBody })
    .then((likedPost: any) => {
      dispatch({
        type: ADD_USER_LIKED_ITEM,
        updatedItem: { id: likedPost.id, postId: likedPost.postId, actorId, actorType }
      });
    })
    .catch((...args) => console.log(args));
}

export const unlikeTimelinePost = (id, postId, userId, carInfoId, actorType) => () => {
  const actorId = actorType === 'car' ? carInfoId : userId;

  unlikeTimelineItem({}, { id })
    .then(unlikedPost => {
      dispatch({
        type: REMOVE_USER_LIKED_ITEM,
        updatedItem: { id, postId, actorId, actorType }
      });
    })
    .catch((...args) => console.log(args))
};