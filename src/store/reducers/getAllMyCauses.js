import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    causes : null,
    error : null,
    deletedStatus: null,
    deletedMessage:null,
    cause_id:null,
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
    });
};

const getCausesFail = (state, action) => {
    return updatedObject(state, {
        causes: null,
        error: action.error,
        loading : false
    })
};

const deleteCauseStart = (state, action) => {
    return updatedObject(state, {error: null,cause_id:action.id,loading:true})
};

const deleteCauseSuccess = (state, action) => {
    const updatedArray = state.causes.data.filter(cause => cause._id !== action.id);
    return updatedObject(state, {
        causes: updatedArray,
        error: null,
        cause_id:null,
        deletedStatus: action.deletedStatus,
        deletedMessage:action.deletedMessage,
        loading : false
    })
};

const deleteCauseFail = (state, action) => {
    return updatedObject(state, {
        //causes: null,
        deletedStatus: null,
        deletedMessage:null,
        error: action.error,
        loading : false
    })
};

export const getAllMyCauses = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_MY_CAUSES_START: return getCausesStart(state, action);
        case actionTypes.GET_MY_CAUSES_SUCCESS: return getCausesSuccess(state, action);
        case actionTypes.GET_MY_CAUSES_FAIL: return getCausesFail(state, action);
        case actionTypes.DELETE_MY_CAUSE_START: return deleteCauseStart(state,action);
        case actionTypes.DELETE_MY_CAUSE_SUCCESS: return deleteCauseSuccess(state,action);
        case actionTypes.DELETE_MY_CAUSE_FAIL: return deleteCauseFail(state,action);
        default: return state
    }
}

