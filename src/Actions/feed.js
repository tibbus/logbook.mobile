import { getTimeline } from '../API/Timeline'

export const getUserFeed = (userId) => {
  return dispatch => {
    getTimeline('user', userId , { userId })
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        // TODO Handle timeline init failure
      })
  }
}