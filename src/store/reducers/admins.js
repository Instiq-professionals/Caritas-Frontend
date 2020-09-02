import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    causes : null,
    events : null,
    error : null,
    loading : false
};

const getAllCausesByAdminsStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllCausesByAdminsSuccess = (state, action) => {
    return updatedObject(state, {
        causes: action.payload,
        error: null,
        loading : false
    });
};

const getAllCausesByAdminsFail = (state, action) => {
    return updatedObject(state, {
        causes: null,
        error: action.error,
        loading : false
    })
};

const getAllEventsByAdminsStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllEventsByAdminsSuccess = (state, action) => {
    return updatedObject(state, {
        events: action.payload,
        error: null,
        loading : false
    });
};

const getAllEventsByAdminsFail = (state, action) => {
    return updatedObject(state, {
        events: null,
        error: action.error,
        loading : false
    })
};



export const admins = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_CAUSES_AS_ADMINS_START: return getAllCausesByAdminsStart(state, action);
        case actionTypes.GET_ALL_CAUSES_AS_ADMINS_SUCCESS: return getAllCausesByAdminsSuccess(state, action);
        case actionTypes.GET_ALL_CAUSES_AS_ADMINS_FAIL: return getAllCausesByAdminsFail(state, action);
        case actionTypes.GET_ALL_EVENTS_AS_ADMINS_START: return getAllEventsByAdminsStart(state, action);
        case actionTypes.GET_ALL_EVENTS_AS_ADMINS_SUCCESS: return getAllEventsByAdminsSuccess(state, action);
        case actionTypes.GET_ALL_EVENTS_AS_ADMINS_FAIL: return getAllEventsByAdminsFail(state, action);
        default: return state
    }
}

