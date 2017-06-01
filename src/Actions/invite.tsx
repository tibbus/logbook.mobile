import { getInviteByReference, postInviteRequest } from '../API/Invite';
import { dispatch } from '../store';
import { SET_INVITE, SET_INVITE_STATUS } from './Types';

export const getInviteStatus = (inviteReference) => {
    return () => {
        getInviteByReference({}, { inviteReference })
            .then(response => {
                const inviteItem = {
                    ...response
                }
                dispatch({ inviteItem, type: SET_INVITE_STATUS })
                console.log(response)
            })
            .catch(error => {
                console.log(error);
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
      postInviteRequest({ body: inviteRequest })
    .then((response: any) => {
        const inviteItem = {
            ...response
        }
        dispatch({ inviteItem, type: SET_INVITE })
        onSuccess(inviteItem);
    })
    .catch(error => {
        console.log(error);
        onFailure();
    });
  }
}