import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    timeToCreateAnotherCause : null,
    error : null,
    loading : false
};

const getProfileStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getProfileSuccess = (state, action) => {
    return updatedObject(state, {
        timeToCreateAnotherCause : action.payload,
        error : null,
        loading : false
    });
};

const getProfileFail = (state, action) => {
    return updatedObject(state, {
        timeToCreateAnotherCause : null,
        error: action.error,
        loading : false
    })
};



export const profile = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_PROFILE_START: return getProfileStart(state, action);
        case actionTypes.USER_PROFILE_SUCCESS: return getProfileSuccess(state, action);
        case actionTypes.USER_PROFILE_FAIL: return getProfileFail(state, action);
        default: return state
    }
}

