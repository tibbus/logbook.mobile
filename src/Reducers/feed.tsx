import moment from 'moment';
import { sortBy } from 'ramda';

import { 
    ADD_FEED_ITEM, 
    ADD_USER_LIKED_ITEM ,
    REMOVE_USER_LIKED_ITEM
} from '../Actions/Types';


/*
    {
        feedItem,
        timeAgo: '',
        liked: ''
    }
*/
const initialState = {
    posts: []
}

const calculateTime = (feedItem) => {
    const { createdDate } = feedItem.activityData
    const timeAgo = moment(new Date(createdDate)).from(moment())

    return timeAgo;
}

const addFeedItem = (state, feedItem) => {

    const timeAgo = calculateTime(feedItem);

    if (state.posts.find(item => item.activityData.id === feedItem.activityData.id)) {

        const newState = {
            posts: []
        }
        newState.posts = state.posts.filter((item) => item.activityData.id !== feedItem.activityData.id)

        newState.posts.push({
            ...feedItem,
            timeAgo: timeAgo
        });

        return newState;
    }
    else {
        state.posts.push({
            ...feedItem,
            timeAgo: timeAgo
        });

        return { ...state };
    }

}

const updateLikesCount = (state, action, value) => {
    let postIndex;
    let post = state.posts.find((item, index) => {
        postIndex = index;
        return item.activityData.id === action.updatedItem.postId;
    });
    
    if(post) {
        post.socialData.likesCount += value;
        state.posts = [...state.posts];
        state.posts[postIndex] = { ...post };

        return { ...state };
    }
    else {
        return {state};
    }

}

export const feed = (state: any = initialState, action) => {
    const { type, feedItem } = action

    switch (type) {
        case ADD_FEED_ITEM:
            return addFeedItem(state, feedItem);
        case ADD_USER_LIKED_ITEM:
            return updateLikesCount(state, action, 1);
        case REMOVE_USER_LIKED_ITEM:
            return updateLikesCount(state,action, -1);
        default:
            return state
    }
}