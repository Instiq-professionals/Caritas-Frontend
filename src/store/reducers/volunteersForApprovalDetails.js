import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    volunteers : null,
    error : null,
    loading : false
};

const getVolunteersForApprovalStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getVolunteersForApprovalSuccess = (state, action) => {
    return updatedObject(state, {
        volunteers: action.payload,
        error: null,
        loading : false
    })
};

const getVolunteersForApprovalFail  = (state, action) => {
    return updatedObject(state, {
        volunteers: null,
        error: action.error,
        loading : false
    })
}

export const getVolunteersForApproval = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_VOLUNTEERS_FOR_APPROVAL_START: return getVolunteersForApprovalStart(state, action);
        case actionTypes.GET_VOLUNTEERS_FOR_APPROVAL_SUCCESS: return getVolunteersForApprovalSuccess(state, action);
        case actionTypes.GET_VOLUNTEERS_FOR_APPROVAL_FAIL: return getVolunteersForApprovalFail(state, action);
        default: return state
    }
}

 