import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    events: null,
    status: null,
    message: null,
    error : null,
    loading : false
};


const getAllEventsForApprovalStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllEventsForApprovalSuccess = (state, action) => {
    return updatedObject(state, {
        events: action.payload,
        error : null,
        loading : false
    })
};

const getAllEventsForApprovalFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};

const makeDecisionOnEventStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const makeDecisionOnEventSuccess = (state, action) => {
    return updatedObject(state, {
        events: action.payload,
        status: action.payload.status,
        message: action.payload.message,
        error : null,
        loading : false
    })
};

const makeDecisionOnEventFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};



export const makeDecisionOnEventByCleader = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_EVENTS_BY_CLEADER_START : return getAllEventsForApprovalStart(state,action);
        case actionTypes.GET_ALL_EVENTS_BY_CLEADER_SUCCESS : return getAllEventsForApprovalSuccess(state,action);
        case actionTypes.GET_ALL_EVENTS_BY_CLEADER_FAIL : return getAllEventsForApprovalFail(state,action);
        case actionTypes.MAKE_DECISION_ON_EVENT_START : return makeDecisionOnEventStart(state, action);
        case actionTypes.MAKE_DECISION_ON_EVENT_SUCCESS :return makeDecisionOnEventSuccess(state, action);
        case actionTypes.MAKE_DECISION_ON_EVENT_FAIL :return makeDecisionOnEventFail(state, action);
        default: return state
    }
}

