import { comments } from './comments'
import { ADD_COMMENT } from '../Actions/Types'

const mockEvent = {
  id: 1,
  type: 'Added Tyres',
  text: 'I love my new tyres and that',
  name: 'Bobs Biscuits',
  profileImg: 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png',
  commentCount: 2,
  likeCount: 4,
  comments: [{
    text: 'Some comment',
    profileImg: 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png'
  }, {
    text: 'Some other comment',
    profileImg: 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png'
  }]
}

const initialState = [1, 2, 3, 4, 5, 6, 7, 8].map(() => mockEvent)

const timeline = (state, action) => {
  const { type, timelineId } = action

  switch (type) {

    case ADD_COMMENT:
      if (timelineId === state.id) {
        return Object.assign(
          {},
          state,
          { comments: comments(state.comments, action) }
        )
      }

      return state
    default:
      return state
  }
}

export const timelines = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case ADD_COMMENT:
      return state.map(tl => timeline(tl, action))

    default:
      return state
  }
}
