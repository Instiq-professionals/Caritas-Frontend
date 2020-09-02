import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'


//registered users route to get their profile
export const getCausesStart = () => {
    return {
        type : actionTypes.GET_ALL_CAUSES_AS_ADMINS_START
    };
};


export const getCausesSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_CAUSES_AS_ADMINS_SUCCESS,
        payload
    };
};

export const getCausesFail = (error) => {
    return {
        type : actionTypes.GET_ALL_CAUSES_AS_ADMINS_FAIL,
        error : error
    };
};
//admin route to get user details
export const getEventsStart = () => {
    return {
        type : actionTypes.GET_ALL_EVENTS_AS_ADMINS_START
    };
};


export const getEventsSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_AS_ADMINS_SUCCESS,
        payload
    };
};

export const getEventsFail = (error) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_AS_ADMINS_FAIL,
        error : error
    };
};


export const getCausesAsAdmin = (token) => {
    return dispatch => {
        dispatch(getCausesStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_causes_by_admins,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('getting my data ' ,res.data);
              dispatch(getCausesSuccess(res.data))
          })
          .catch(err => {
            console.log('from redux err',err.response.data);
            dispatch(getCausesFail(err.response.data))
          })
    }
};

export const getEventsAsAdmin = (token) => {
    return dispatch => {
        dispatch(getEventsStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_events_by_admins,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('getting user data ' ,res.data);
              dispatch(getEventsSuccess(res.data))
          })
          .catch(err => {
            console.log('from redux err',err.response.data);
            dispatch(getEventsFail(err.response.data))
          })
    }
};





