import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    story : null,
    error : null,
    editStatus: null,
    editMessage: null,
    loading : false
};

const createMySuccessStoryStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const createMySuccessStorySuccess = (state, action) => {
    return updatedObject(state, {
        story: action.payload,
        error: null,
        loading : false
    })
};

const createMySuccessStoryFail = (state, action) => {
    return updatedObject(state, {
        story: null,
        error: action.error,
        loading : false
    })
};

const getMyStoryStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getMyStorySuccess = (state, action) => {
    return updatedObject(state, {
        story: action.payload,
        error: null,
        loading : false
    })
};

const getMyStoryFail = (state, action) => {
    return updatedObject(state, {
        story: null,
        error: action.error,
        loading : false
    })
};

const editMyStoryStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const editMyStorySuccess = (state, action) => {
    return updatedObject(state, {
        story: action.payload,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
        error: null,
        loading : false
    })
};

const editMyStoryFail = (state, action) => {
    return updatedObject(state, {
        editStatus: null,
        editMessage: null,
        error: action.error,
        loading : false
    })
}


export const MyStoryDetails = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_MY_SUCCESS_STORY_START: return createMySuccessStoryStart(state, action);
        case actionTypes.CREATE_MY_SUCCESS_STORY_SUCCESS: return createMySuccessStorySuccess(state, action);
        case actionTypes.CREATE_MY_SUCCESS_STORY_FAIL: return createMySuccessStoryFail(state, action);
        case actionTypes.CHECK_SUCCESS_STORY_DETAILS_START: return getMyStoryStart(state, action);
        case actionTypes.CHECK_SUCCESS_STORY_DETAILS_SUCCESS: return getMyStorySuccess(state, action);
        case actionTypes.CHECK_SUCCESS_STORY_DETAILS_FAIL: return getMyStoryFail(state, action);
        case actionTypes.EDIT_MY_SUCCESS_STORY_START: return editMyStoryStart(state,action);
        case actionTypes.EDIT_MY_SUCCESS_STORY_SUCCESS: return editMyStorySuccess(state,action);
        case actionTypes.EDIT_MY_SUCCESS_STORY_FAIL: return editMyStoryFail(state,action);
        default: return state
    }
}

