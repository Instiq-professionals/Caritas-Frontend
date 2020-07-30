import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    message: null,
    error : null,
    loading : false
};


const makeDecisionOnVolunteerStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const makeDecisionOnVolunteerSuccess = (state, action) => {
    return updatedObject(state, {
        //token : action.idToken,
        message: action.payload,
        error : null,
        loading : false
    })
};

const makeDecisionOnVolunteerFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};



export const makeDecisionOnVolunteer = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.ACCEPT_OR_REJECT_A_VOLUNTEER_START : return makeDecisionOnVolunteerStart(state, action);
        case actionTypes.ACCEPT_OR_REJECT_A_VOLUNTEER_SUCCESS :return makeDecisionOnVolunteerSuccess(state, action);
        case actionTypes.ACCEPT_OR_REJECT_A_VOLUNTEER_FAIL :return makeDecisionOnVolunteerFail(state, action);
        default: return state
    }
}

