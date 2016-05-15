import {
  ADD_COMMENT
} from '../Actions/Types'

// const comment = (state, action) => {
//   const { type, id } = action
//   switch (type) {

//     default:
//       return state
//   }
// }

export const comments = (state, action) => {
  const { type, id, text } = action
  switch (type) {
    case ADD_COMMENT:
      return state.concat({
        id,
        text
      })

    default:
      return state
  }
}
