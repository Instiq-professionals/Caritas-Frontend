import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    events: null,
    event:null,
    status: null,
    message: null,
    error : null,
    loading : false
};


const getAllEventsForResolutionStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllEventsForResolutionSuccess = (state, action) => {
    return updatedObject(state, {
        events: action.payload,
        error : null,
        loading : false
    })
};

const getAllEventsForResolutionFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};

const resolveAnEventStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const resolveAnEventSuccess = (state, action) => {
    return updatedObject(state, {
        event: action.payload,
        status: action.payload.status,
        message: action.payload.message,
        error : null,
        loading : false
    })
};

const resolveAnEventFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};



export const resolveEvent = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_EVENTS_TO_BE_RESOLVED_START : return getAllEventsForResolutionStart(state,action);
        case actionTypes.GET_ALL_EVENTS_TO_BE_RESOLVED_SUCCESS : return getAllEventsForResolutionSuccess(state,action);
        case actionTypes.GET_ALL_EVENTS_TO_BE_RESOLVED_FAIL : return getAllEventsForResolutionFail(state,action);
        case actionTypes.RESOLVE_EVENT_START : return resolveAnEventStart(state, action);
        case actionTypes.RESOLVE_EVENT_SUCCESS :return resolveAnEventSuccess(state, action);
        case actionTypes.RESOLVE_EVENT_FAIL :return resolveAnEventFail(state, action);
        default: return state
    }
}

