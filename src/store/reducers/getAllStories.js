import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    stories : null,
    error : null,
    loading : false
};

const getAllSuccessStoriesStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllSuccessStoriesSuccess = (state, action) => {
    return updatedObject(state, {
        stories: action.payload,
        error: null,
        loading : false
    });
};

const getAllSuccessStoriesFail = (state, action) => {
    return updatedObject(state, {
        stories: null,
        error: action.error,
        loading : false
    })
};


export const getAllSuccessStories = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_SUCCESS_STORIES_START: return getAllSuccessStoriesStart(state, action);
        case actionTypes.GET_ALL_SUCCESS_STORIES_SUCCESS: return getAllSuccessStoriesSuccess(state, action);
        case actionTypes.GET_ALL_SUCCESS_STORIES_FAIL: return getAllSuccessStoriesFail(state, action);
        default: return state
    }
}

