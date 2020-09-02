import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    details:null,
    userProfile:null,
    timeToCreateAnotherCause : null,
    error : null,
    userProfileError: null,
    loading : false
};

const getMyProfileStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getMyProfileSuccess = (state, action) => {
    return updatedObject(state, {
        details:action.payload,
        timeToCreateAnotherCause : action.payload.daysLeft,
        error : null,
        loading : false
    });
};

const getMyProfileFail = (state, action) => {
    return updatedObject(state, {
        details:null,
        timeToCreateAnotherCause : null,
        error: action.error,
        loading : false
    })
};

const getProfileStart = (state, action) => {
    return updatedObject(state, {userProfileError: null, loading:true})
};

const getProfileSuccess = (state, action) => {
    return updatedObject(state, {
        userProfile:action.payload,
        timeToCreateAnotherCause : action.payload.daysLeft,
        userProfileError: null,
        loading : false
    });
};

const getProfileFail = (state, action) => {
    return updatedObject(state, {
        userProfile:null,
        timeToCreateAnotherCause : null,
        userProfileError: action.error,
        loading : false
    })
};



export const profile = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_PROFILE_START: return getMyProfileStart(state, action);
        case actionTypes.USER_PROFILE_SUCCESS: return getMyProfileSuccess(state, action);
        case actionTypes.USER_PROFILE_FAIL: return getMyProfileFail(state, action);
        case actionTypes.GET_USER_DETAILS_START: return getProfileStart(state, action);
        case actionTypes.GET_USER_DETAILS_SUCCESS: return getProfileSuccess(state, action);
        case actionTypes.GET_USER_DETAILS_FAIL: return getProfileFail(state, action);
        default: return state
    }
}

