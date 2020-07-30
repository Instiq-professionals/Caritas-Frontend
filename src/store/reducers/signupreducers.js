import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility'

const initialState = {
    token : null,
    gatherUser : null,
    account : null,
    userID : null,
    error : null,
    isAuth : false,
    loading : false
};

const accountDetails = (state, action) => {
    return updatedObject(state, {
        account : action.payload,
        error : null,
        isAuth : true,
        loading : false
    })
};

const gatherPersonalDetails = (state, action) => {
    return updatedObject(state, {
        gatherUser : action.payload,
        error : null,
        isAuth : true,
        loading : false
    })
};

const regStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const regSuccess = (state, action) => {
    return updatedObject(state, {
        //token : action.idToken,
        userId: action.payload,
        error : null,
        isAuth : true,
        loading : false
    })
};

const regFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
        isAuth : false,
    })
};



export const signUpreducer = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.ACCOUNT_DETAILS : return accountDetails(state, action);
        case actionTypes.GATHER_PERSONAL_DETAILS : return gatherPersonalDetails(state, action);
        case actionTypes.REG_START : return regStart(state, action);
        case actionTypes.REG_SUCCESS :return regSuccess(state, action);
        case actionTypes.REG_FAIL :return regFail(state, action);
        default: return state
    }
}

