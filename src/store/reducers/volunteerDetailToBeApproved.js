import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    volunteer : null,
    error : null,
    loading : false
};

const getVolunteerForApprovalStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getVolunteerForApprovalSuccess = (state, action) => {
    return updatedObject(state, {
        volunteer: action.payload,
        error: null,
        loading : false
    })
};

const getVolunteerForApprovalFail  = (state, action) => {
    return updatedObject(state, {
        volunteers: null,
        error: action.error,
        loading : false
    })
}

export const getVolunteerForApproval = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_VOLUNTEER_DETAILS_FOR_APPROVAL_START: return getVolunteerForApprovalStart(state, action);
        case actionTypes.GET_VOLUNTEER_DETAILS_FOR_APPROVAL_SUCCESS: return getVolunteerForApprovalSuccess(state, action);
        case actionTypes.GET_VOLUNTEER_DETAILS_FOR_APPROVAL_FAIL: return getVolunteerForApprovalFail(state, action);
        default: return state
    }
}

 