import { getInviteByReference, postInviteRequest } from '../API/Invite';
import { dispatch } from '../store';
import { SET_INVITE, SET_INVITE_STATUS, SET_LOADING_STATUS, UNSET_LOADING_STATUS } from './Types';

export const getInviteStatus = (inviteReference) => {
    return () => {
        dispatch({ type: SET_LOADING_STATUS, resourceName: 'invites' })
        getInviteByReference({}, { inviteReference })
            .then(response => {
                const inviteItem = {
                    ...response
                }
                dispatch({ inviteItem, type: SET_INVITE_STATUS })
                dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'invites' });
                console.log(response)
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'invites' });
            })
    }
}

export const submitInvite = (inviteDetails, onSuccess, onFailure) => () => {

  const inviteRequest = {
    'email': inviteDetails.email,
    'name': inviteDetails.fullName,
    'registrationNumber': inviteDetails.regNo
  };

  return () => {
       dispatch({ type: SET_LOADING_STATUS, resourceName: 'invites' })
      postInviteRequest({ body: inviteRequest })
        .then((response: any) => {
            const inviteItem = {
                ...response
            }
        dispatch({ inviteItem, type: SET_INVITE })
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'invites' });
        onSuccess(inviteItem);
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: UNSET_LOADING_STATUS, resourceName: 'invites' });
        onFailure();
    });
  }
}