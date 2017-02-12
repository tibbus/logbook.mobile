import {
  ADD_COMMENTS,
  ADD_TIMELINE_COMMENT,
  ADD_TIMELINE_COMMENTS
} from '../Actions/Types'
import moment from 'moment'

const initialState = []

const getTimeAgo = (createdDate) => {
    return moment(new Date(createdDate)).fromNow();
  }

const transformComment = (comment) => {
  return {
    id: comment.id,
    authorUserId: comment.authorUserId,
    recipientUserId: comment.recipientUserId,
    comment: comment.comment,
    timeAgo: getTimeAgo(comment.createdDate)
  };
}

const addCommentsToState = (state, timelinePostId, timelineComments) => {

  const timelinePostComments = {
    timelinePostId: timelinePostId,
    comments: timelineComments.map(transformComment)
  }

  const newState = state.filter((item) => item.timelinePostId !== timelinePostId);
  newState.push(timelinePostComments)
  return newState;
}

const addCommentToState = (state, newTimelineComment) => {
  var existingTimelineComments = state.find((timelineComment) => {
    return timelineComment.timelinePostId == newTimelineComment.timelineId;
  })

  if(existingTimelineComments){
    const newState = state.filter((item) => item.timelinePostId !== newTimelineComment.timelineId)
    const updatedTimelinePostComments = {
      timelinePostId: existingTimelineComments.timelinePostId,
      comments: existingTimelineComments.comments.concat([transformComment(newTimelineComment)])
    };
    newState.push(updatedTimelinePostComments);
    return newState;
  }
  else {
    return state.push({
      timelinePostId: newTimelineComment.timelineId,
      comments: [transformComment(newTimelineComment)]
    });
  }
};

export const comments = (state = initialState, action) => {
  const { type, timelineComments, timelinePostComment, timelinePostCommentDetails } = action;
  
  switch (type) {
    case ADD_COMMENTS:
      return [
        ...state,
        {
          ...timelineComments
        }
      ];
    case ADD_TIMELINE_COMMENT:
      return addCommentToState(state, timelinePostComment);
    
    case ADD_TIMELINE_COMMENTS:
      return addCommentsToState(state, timelinePostCommentDetails.timelinePostId, timelinePostCommentDetails.timelineComments);

    default:
      return state
  }
}
