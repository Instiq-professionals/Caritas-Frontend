import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllCausesByAuserStart = () => {
    return {
        type : actionTypes.GET_ALL_CAUSES_BY_A_USER_START
    };
};

export const getAllCausesByAuserSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_CAUSES_BY_A_USER_SUCCESS,
        payload
    };
};

export const getAllCausesByAuserFail = (error) => {
    return {
        type : actionTypes.GET_ALL_CAUSES_BY_A_USER_FAIL,
        error : error
    };
};

export const getAllCausesByAuser = (token) => {
    return dispatch => {
        getAllCausesByAuserStart();
         axios({
            method : 'get',
            url: Routes.get_all_causes_by_a_user,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(getAllCausesByAuserSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getAllCausesByAuserFail(err.response.data))
          })
    }
}

export const checkCauseDetailStart = () => {
    return {
        type : actionTypes.GET_SINGLE_CAUSE_BY_A_USER_START
    };
};


export const checkCauseDetailSuccess = (payload) => {
    return {
        type : actionTypes.GET_SINGLE_CAUSE_BY_A_USER_SUCCESS,
        payload
    };
};

export const checkCauseDetailFail = (error) => {
    return {
        type : actionTypes.GET_SINGLE_CAUSE_BY_A_USER_FAIL,
        error : error
    };
};

export const checkCauseDetails = (token,cause_id) => {
    return dispatch => {
        dispatch(checkCauseDetailStart());
         axios({
            method : 'get',
            url: Routes.get_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(checkCauseDetailSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(checkCauseDetailFail(err.response.data))
          })
    }
}



