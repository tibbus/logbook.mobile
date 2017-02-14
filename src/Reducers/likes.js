import {
  LIKE_TIMELINE_ITEM,
  SET_USER_LIKED_ITEMS
} from '../Actions/Types'

initialState = []

export const likes = (state = initialState, action) => {
  const { type, likedItems} = action;
  
  switch (type) {
    case SET_USER_LIKED_ITEMS:
        return likedItems;
        ;
    default:
      return state
  }
}