import { getComment, createComment } from '../API/Comment'
import { ADD_COMMENTS, ADD_TIMELINE_COMMENT, ADD_TIMELINE_COMMENTS } from './Types'

export const setTimelineComments = (timelinePostId) => dispatch => {
    dispatch({
        type: ADD_COMMENTS,
        timelineComments: {
            timelinePostId,
            comments: []
        }
    });
}

export const getTimelineComments = (timelinePostId) => dispatch => {
  getComment({}, {timelinePostId})
  .then(retrievedComments => {
    dispatch({
      type: ADD_TIMELINE_COMMENTS,
      timelinePostCommentDetails: {
        timelinePostId: timelinePostId,
        timelineComments: retrievedComments
      }
    });
  })
  .catch((...args) => console.log(args));
}


export const addComment = (timelinePostId, authorUserId, comment) => dispatch => {

  const body = { authorUserId: authorUserId, comment: comment };
  createComment({ body: body }, { timelinePostId})
  .then(createdComment => {
    dispatch({
      type: ADD_TIMELINE_COMMENT,
      timelinePostComment: createdComment
    });
  })
  .catch((...args) => console.log(args));
}