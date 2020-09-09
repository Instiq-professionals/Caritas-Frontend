import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllEventForResolutionStart = () => {
    return {
        type : actionTypes.GET_ALL_EVENTS_TO_BE_RESOLVED_START
    };
};

export const getAllEventForResolutionSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_TO_BE_RESOLVED_SUCCESS,
        payload
    };
};

export const getAllEventForResolutionFail = (error) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_TO_BE_RESOLVED_FAIL,
        error : error
    };
};

export const getEventForResolution = (token) => {
    return dispatch => {
        dispatch(getAllEventForResolutionStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_event,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(getAllEventForResolutionSuccess(res.data))
          })
          .catch(err => {
            dispatch(getAllEventForResolutionFail(err.response.data))
          })
    }
}


export const resolveEventStart = () => {
    return {
        type : actionTypes.RESOLVE_EVENT_START
    };
};

export const resolveEventSuccess = (payload) => {
    return {
        type : actionTypes.RESOLVE_EVENT_SUCCESS,
        // idToken: token,
        payload
    };
};

export const resolveEventFAIL = (error) => {
    return {
        type : actionTypes.RESOLVE_EVENT_FAIL,
        error : error,
    };
};

export const resolveEvent  = (token,event_id) => {
    return dispatch => {
        dispatch(resolveEventStart());
         axios({
            method : 'put',
            url: Routes.close_event + event_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(resolveEventSuccess(res.data))
          })
          .catch(err => {
            dispatch(resolveEventFAIL(err.response.data))
          })
    }
};




