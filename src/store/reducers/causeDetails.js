import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    cause : null,
    error : null,
    loading : false
};

const setDetails = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getCause = (state, action) => {
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

export const displayCause = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DETAILS: return setDetails(state, action);
        case actionTypes.GET_CAUSE_DETAILS: return getCause(state, action);
        case actionTypes.GET_CAUSE_DETAILS_FAIL: return getCauseFail(state, action);
        default: return state
    }
}

