import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllCausesForApprovalStart = () => {
    return {
        type : actionTypes.GET_CAUSES_FOR_APPROVAL_START
    };
};

export const getAllCausesForApprovalSuccess = (payload) => {
    return {
        type : actionTypes.GET_CAUSES_FOR_APPROVAL_SUCCESS,
        payload
    };
};

export const getAllCausesApprovalFail = (error) => {
    return {
        type : actionTypes.GET_CAUSES_FOR_APPROVAL_FAIL,
        error : error
    };
};

export const getCausesForApproval = (token) => {
    return dispatch => {
        dispatch(getAllCausesForApprovalStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_causes_for_approval,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(getAllCausesForApprovalSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getAllCausesApprovalFail(err.response.data))
          })
    }
}


export const makeDecisionOnCauseStart = () => {
    return {
        type : actionTypes.ACCEPT_OR_REJECT_CAUSE_START
    };
};

export const makeDecisionOnCauseSuccess = (payload) => {
    return {
        type : actionTypes.ACCEPT_OR_REJECT_CAUSE_SUCCESS,
        // idToken: token,
        payload
    };
};

export const makeDecisionOnCauseFAIL = (error) => {
    return {
        type : actionTypes.ACCEPT_OR_REJECT_CAUSE_FAIL,
        error : error,
    };
};

export const approveCause  = (token,cause_id) => {
    return dispatch => {
        dispatch(makeDecisionOnCauseStart());
         axios({
            method : 'put',
            url: Routes.approve_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(makeDecisionOnCauseSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(makeDecisionOnCauseFAIL(err.response.data))
          })
    }
};

export const disApproveCause  = (token,cause_id) => {
    return dispatch => {
        dispatch(makeDecisionOnCauseStart());
         axios({
            method : 'put',
            url: Routes.disapprove_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(makeDecisionOnCauseSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(makeDecisionOnCauseFAIL(err.response.data))
          })
    }
}


