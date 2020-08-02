import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    causes : null,
    error : null,
    loading : false
};

const getCausesStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getCausesSuccess = (state, action) => {
    return updatedObject(state, {
        causes: action.payload,
        error: null,
        loading : false
    })
};

const getCausesFail = (state, action) => {
    return updatedObject(state, {
        causes: null,
        error: action.error,
        loading : false
    })
}

export const getCausesBySingleUser = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_CAUSES_BY_A_USER_START: return getCausesStart(state, action);
        case actionTypes.GET_ALL_CAUSES_BY_A_USER_SUCCESS: return getCausesSuccess(state, action);
        case actionTypes.GET_ALL_CAUSES_BY_A_USER_FAIL: return getCausesFail(state, action);
        default: return state
    }
}

