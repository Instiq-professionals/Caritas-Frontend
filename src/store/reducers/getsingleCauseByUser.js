import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    cause : null,
    error : null,
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
}

export const getCauseBySingleUser = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_SINGLE_CAUSE_BY_A_USER_START: return getCauseStart(state, action);
        case actionTypes.GET_SINGLE_CAUSE_BY_A_USER_SUCCESS: return getCauseSuccess(state, action);
        case actionTypes.GET_SINGLE_CAUSE_BY_A_USER_FAIL: return getCauseFail(state, action);
        default: return state
    }
}

