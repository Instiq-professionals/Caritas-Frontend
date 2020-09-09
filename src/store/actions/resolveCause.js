import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllCausesForResolutionStart = () => {
    return {
        type : actionTypes.GET_CAUSES_FOR_RESOLUTION_START
    };
};

export const getAllCausesForResolutionSuccess = (payload) => {
    return {
        type : actionTypes.GET_CAUSES_FOR_RESOLUTION_SUCCESS,
        payload
    };
};

export const getAllCausesResolutionFail = (error) => {
    return {
        type : actionTypes.GET_CAUSES_FOR_RESOLUTION_FAIL,
        error : error
    };
};

export const getCausesForResolution = (token) => {
    return dispatch => {
        dispatch(getAllCausesForResolutionStart());
         axios({
            method : 'get',
            url: Routes.get_causes_to_be_resolved,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(getAllCausesForResolutionSuccess(res.data))
          })
          .catch(err => {
            dispatch(getAllCausesResolutionFail(err.response.data))
          })
    }
}


export const resolveCauseStart = () => {
    return {
        type : actionTypes.RESOLVE_CAUSE_START
    };
};

export const resolveCauseSuccess = (payload) => {
    return {
        type : actionTypes.RESOLVE_CAUSE_SUCCESS,
        // idToken: token,
        payload
    };
};

export const resolveCauseFAIL = (error) => {
    return {
        type : actionTypes.RESOLVE_CAUSE_FAIL,
        error : error,
    };
};

export const resolveCause  = (token,cause_id) => {
    return dispatch => {
        dispatch(resolveCauseStart());
         axios({
            method : 'put',
            url: Routes.get_cause_to_be_resolved + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(resolveCauseSuccess(res.data))
          })
          .catch(err => {
            dispatch(resolveCauseFAIL(err.response.data))
          })
    }
};




