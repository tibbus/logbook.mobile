import {
  POST_PUBLISHED,
  UPDATE_POST,
  RESET_POST
} from '../Actions/Types'

const initialState = {
    published: false,
    publishPending: true,
    data: {
        carInfoId: '',
        postType: '',
        description: '',
        tags: [],
        canAddContent: true,
        content: {
            contentType: '',
            data: []
        },
        postToFBGroup: false,
        car: {
            make: '',
            model: '',
            image: '',
            yearOfManufacture: ''
        }
    }
};

export const post = (state = initialState, action) => {
  const { type, item, published, publishPending } = action

  switch (type) {

    case UPDATE_POST:
        return {
            ...state,
            ...item
        };
    
    case POST_PUBLISHED:
        const updatedState = { ...state }
        updatedState.published = published
        updatedState.publishPending = publishPending
        return updatedState;       
        
    case RESET_POST:
        return initialState;

    default:
      return state
  }
}