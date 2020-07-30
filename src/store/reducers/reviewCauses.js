import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    causes : null,
    error : null,
    loading : false
};

const setDetails = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getCauses = (state, action) => {
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

export const displayCausesForReview = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_CAUSE_AS_VOLUNTEER_OR_ADMIN: return getCauses (state, action);
        case actionTypes.GET_CAUSE_AS_VOLUNTEER_OR_ADMIN_FAIL: return getCausesFail(state, action);
        default: return state
    }
}

