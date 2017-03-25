import {
  ADD_USER_LIKED_ITEM,
  REMOVE_USER_LIKED_ITEM,
  SET_USER_LIKED_ITEMS
} from '../Actions/Types'

const initialState = []

const updateItem = (state, updatedItem, removeItem = false) => {

  if (removeItem) {
    const newState = state.filter(item => item.id !== updatedItem.id)
    return [...newState];
  }
  else {
    state.push(updatedItem);
    return [...state];
  }
}

export const likes = (state = initialState, action) => {
  const { type, likedItems, updatedItem } = action;

  switch (type) {
    case SET_USER_LIKED_ITEMS:
      return [
        ...state,
        ...likedItems
      ];
    case ADD_USER_LIKED_ITEM:
      return updateItem(state, updatedItem);
    case REMOVE_USER_LIKED_ITEM:
      return updateItem(state, updatedItem, true)
    default:
      return state
  }
}