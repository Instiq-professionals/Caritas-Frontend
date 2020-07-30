import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    message: null,
    error : null,
    loading : false
};


const recommendCauseStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const recommendCauseSuccess = (state, action) => {
    return updatedObject(state, {
        //token : action.idToken,
        message: action.payload,
        error : null,
        loading : false
    })
};

const recommendCauseFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};



export const recommendCause = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.REVIEW_A_SINGLE_CAUSE_START : return recommendCauseStart(state, action);
        case actionTypes.REVIEW_A_SINGLE_CAUSE_SUCCESS :return recommendCauseSuccess(state, action);
        case actionTypes.REVIEW_A_SINGLE_CAUSE_FAIL :return recommendCauseFail(state, action);
        default: return state
    }
}

