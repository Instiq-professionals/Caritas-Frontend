import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    causes: null,
    status: null,
    message: null,
    error : null,
    loading : false
};


const getAllCausesForApprovalStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllCausesForApprovalSuccess = (state, action) => {
    return updatedObject(state, {
        causes: action.payload,
        error : null,
        loading : false
    })
};

const getAllCausesForApprovalFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};

const makeDecisionOnCauseStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const makeDecisionOnCauseSuccess = (state, action) => {
    return updatedObject(state, {
        causes: action.payload,
        status: action.payload.status,
        message: action.payload.message,
        error : null,
        loading : false
    })
};

const makeDecisionOnCauseFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};



export const makeDecisionOnCause = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.GET_CAUSES_FOR_APPROVAL_START : return getAllCausesForApprovalStart(state,action);
        case actionTypes.GET_CAUSES_FOR_APPROVAL_SUCCESS : return getAllCausesForApprovalSuccess(state,action);
        case actionTypes.GET_CAUSES_FOR_APPROVAL_FAIL : return getAllCausesForApprovalFail(state,action);
        case actionTypes.ACCEPT_OR_REJECT_CAUSE_START : return makeDecisionOnCauseStart(state, action);
        case actionTypes.ACCEPT_OR_REJECT_CAUSE_SUCCESS :return makeDecisionOnCauseSuccess(state, action);
        case actionTypes.ACCEPT_OR_REJECT_CAUSE_FAIL :return makeDecisionOnCauseFail(state, action);
        default: return state
    }
}

