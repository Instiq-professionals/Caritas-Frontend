import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'



export const getProfileStart = () => {
    return {
        type : actionTypes.USER_PROFILE_START
    };
};


export const getProfileSuccess = (payload) => {
    return {
        type : actionTypes.USER_PROFILE_SUCCESS,
        payload
    };
};

export const getProfileFail = (error) => {
    return {
        type : actionTypes.USER_PROFILE_FAIL,
        error : error
    };
};

export const profile = (token) => {
    return dispatch => {
        dispatch(getProfileStart());
         axios({
            method : 'post',
            url: Routes.user_home,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('daysLeft from redux ' ,res.data);
              dispatch(getProfileSuccess(res.data.daysLeft))
          })
          .catch(err => {
            console.log('from redux err',err.response.data);
            dispatch(getProfileFail(err.response.data))
          })
    }
};





