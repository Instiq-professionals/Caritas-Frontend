import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    causes : null,
    error : null,
    loading : false
};

const getAllCausesByCategoryStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllCausesByCategorySuccess = (state, action) => {
    return updatedObject(state, {
        causes: action.payload,
        error: null,
        loading : false
    });
};

const getAllCausesByCategoryFail = (state, action) => {
    return updatedObject(state, {
        causes: null,
        error: action.error,
        loading : false
    })
};



export const getAllCausesByCategory = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_CAUSES_BY_CATEGORY_START: return getAllCausesByCategoryStart(state, action);
        case actionTypes.GET_ALL_CAUSES_BY_CATEGORY_SUCCESS: return getAllCausesByCategorySuccess(state, action);
        case actionTypes.GET_ALL_CAUSES_BY_CATEGORY_FAIL: return getAllCausesByCategoryFail(state, action);
        default: return state
    }
}

