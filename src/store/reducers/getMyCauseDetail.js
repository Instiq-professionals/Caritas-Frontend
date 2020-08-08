import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    cause : null,
    error : null,
    editStatus: null,
    editMessage: null,
    loading : false
};

const getCauseStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getCauseSuccess = (state, action) => {
    return updatedObject(state, {
        cause: action.payload,
        error: null,
        loading : false
    })
};

const getCauseFail = (state, action) => {
    return updatedObject(state, {
        cause: null,
        error: action.error,
        loading : false
    })
};

const editCauseStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const editCauseSuccess = (state, action) => {
    return updatedObject(state, {
        cause: action.payload,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
        error: null,
        loading : false
    })
};

const editCauseFail = (state, action) => {
    return updatedObject(state, {
        editStatus: null,
        editMessage: null,
        error: action.error,
        loading : false
    })
}


export const getMyCause = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_MY_CAUSE_DETAILS_START: return getCauseStart(state, action);
        case actionTypes.GET_MY_CAUSE_DETAILS_SUCCESS: return getCauseSuccess(state, action);
        case actionTypes.GET_MY_CAUSE_DETAILS_FAIL: return getCauseFail(state, action);
        case actionTypes.EDIT_MY_CAUSE_START: return editCauseStart(state,action);
        case actionTypes.EDIT_MY_CAUSE_SUCCESS: return editCauseSuccess(state,action);
        case actionTypes.EDIT_MY_CAUSE_FAIL: return editCauseFail(state,action);
        default: return state
    }
}

