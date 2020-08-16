import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    causes: null,
    cause:null,
    status: null,
    message: null,
    error : null,
    loading : false
};


const getAllCausesForResolutionStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllCausesForResolutionSuccess = (state, action) => {
    return updatedObject(state, {
        causes: action.payload,
        error : null,
        loading : false
    })
};

const getAllCausesForResolutionFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};

const resolveACauseStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const resolveACauseSuccess = (state, action) => {
    return updatedObject(state, {
        cause: action.payload,
        status: action.payload.status,
        message: action.payload.message,
        error : null,
        loading : false
    })
};

const resolveACauseFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};



export const resolveCause = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.GET_CAUSES_FOR_RESOLUTION_START : return getAllCausesForResolutionStart(state,action);
        case actionTypes.GET_CAUSES_FOR_RESOLUTION_SUCCESS : return getAllCausesForResolutionSuccess(state,action);
        case actionTypes.GET_CAUSES_FOR_RESOLUTION_FAIL : return getAllCausesForResolutionFail(state,action);
        case actionTypes.RESOLVE_CAUSE_START : return resolveACauseStart(state, action);
        case actionTypes.RESOLVE_CAUSE_SUCCESS :return resolveACauseSuccess(state, action);
        case actionTypes.RESOLVE_CAUSE_FAIL :return resolveACauseFail(state, action);
        default: return state
    }
}

