import {
  SET_INVITE,
  SET_INVITE_STATUS,
} from '../Actions/Types'

const initialState = []

/*
invite = {
    inviteReference: '',
    status: 'Pending'
}
*/

const updateStatus = (state, updatedItem) => {

    const invite = state.find(invite => invite.inviteReference === updatedItem.inviteReference);

    if(invite) {
        invite.status = updatedItem.status;
        return [...state];
    } 
    else {
      state.push(updatedItem)
      return [...state]
    }
}

export const invites = (state = initialState, action) => {
  const { type, inviteItem } = action;

  switch (type) {
    case SET_INVITE:
      state.push(inviteItem)
      return [...state];
    case SET_INVITE_STATUS:
      return updateStatus(state, inviteItem);
    default:
      return state
  }
}