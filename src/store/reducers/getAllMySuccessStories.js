import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    stories : null,
    error : null,
    deletedStatus: null,
    deletedMessage:null,
    story_id:null,
    loading : false
};

const getMyStoriesStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getMyStoriesSuccess = (state, action) => {
    return updatedObject(state, {
        stories: action.payload,
        error: null,
        loading : false
    });
};

const getMyStoriesFail = (state, action) => {
    return updatedObject(state, {
        stories: null,
        error: action.error,
        loading : false
    })
};

const deleteStoryStart = (state, action) => {
    return updatedObject(state, {error: null,story_id:action.id,loading:true})
};

const deleteStorySuccess = (state, action) => {
    const updatedArray = state.stories.data.filter(story => story._id !== action.id);
    return updatedObject(state, {
        stories: updatedArray,
        error: null,
        story_id:null,
        deletedStatus: action.deletedStatus,
        deletedMessage:action.deletedMessage,
        loading : false
    })
};

const deleteStoryFail = (state, action) => {
    return updatedObject(state, {
        deletedStatus: null,
        deletedMessage:null,
        error: action.error,
        loading : false
    })
};

export const getAllMySuccessStories = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_MY_SUCCESS_STORIES_START: return getMyStoriesStart(state, action);
        case actionTypes.GET_MY_SUCCESS_STORIES_SUCCESS: return getMyStoriesSuccess(state, action);
        case actionTypes.GET_MY_SUCCESS_STORIES_FAIL: return getMyStoriesFail(state, action);
        case actionTypes.DELETE_MY_SUCCESS_STORY_START: return deleteStoryStart(state,action);
        case actionTypes.DELETE_MY_SUCCESS_STORY_SUCCESS: return deleteStorySuccess(state,action);
        case actionTypes.DELETE_MY_SUCCESS_STORY_FAIL: return deleteStoryFail(state,action);
        default: return state
    }
}

