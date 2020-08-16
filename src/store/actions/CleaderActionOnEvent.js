import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllEventByCleaderStart = () => {
    return {
        type : actionTypes.GET_ALL_EVENTS_BY_CLEADER_START 
    };
};

export const getAllEventByCleaderSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_BY_CLEADER_SUCCESS,
        payload
    };
};

export const getEventByCleaderFail = (error) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_BY_CLEADER_FAIL,
        error : error
    };
};

export const getEventByCleader = (token) => {
    return dispatch => {
        dispatch(getAllEventByCleaderStart());
         axios({
            method : 'get',
            url: Routes.fetch_events_for_approval,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(getAllEventByCleaderSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getEventByCleaderFail(err.response.data))
          })
    }
}


export const makeDecisionOnEventStart = () => {
    return {
        type : actionTypes.MAKE_DECISION_ON_EVENT_START
    };
};

export const makeDecisionOnEventSuccess = (payload) => {
    return {
        type : actionTypes.MAKE_DECISION_ON_EVENT_SUCCESS,
        // idToken: token,
        payload
    };
};

export const makeDecisionOnEventFAIL = (error) => {
    return {
        type : actionTypes.MAKE_DECISION_ON_EVENT_FAIL,
        error : error,
    };
};

export const approveEventByCleader  = (token,event_id) => {
    return dispatch => {
        dispatch(makeDecisionOnEventStart());
         axios({
            method : 'put',
            url: Routes.approval_event_by_cLeader + event_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(makeDecisionOnEventSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(makeDecisionOnEventFAIL(err.response.data))
          })
    }
};

export const disApproveEvent  = (token,event_id,reason_for_disapproval) => {
    return dispatch => {
        dispatch(makeDecisionOnEventStart());
        const formData = new FormData();
        formData.append("reason_for_disapproval", reason_for_disapproval);
         axios({
            method : 'put',
            data: formData,
            url: Routes.disapproval_event_by_cLeader + event_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(makeDecisionOnEventSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(makeDecisionOnEventFAIL(err.response.data))
          })
    }
}


