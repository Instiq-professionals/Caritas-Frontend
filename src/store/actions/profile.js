import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'


//registered users route to get their profile
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
//admin route to get user details
export const getUserProfileStart = () => {
    return {
        type : actionTypes.GET_USER_DETAILS_START
    };
};


export const getUserProfileSuccess = (payload) => {
    return {
        type : actionTypes.GET_USER_DETAILS_SUCCESS,
        payload
    };
};

export const getUserProfileFail = (error) => {
    return {
        type : actionTypes.GET_USER_DETAILS_FAIL,
        error : error
    };
};


//user
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
              console.log('getting my data ' ,res.data);
              dispatch(getProfileSuccess(res.data))
          })
          .catch(err => {
            console.log('from redux err',err.response.data);
            dispatch(getProfileFail(err.response.data))
          })
    }
};

// the admin , superAdmin and chairman have an access to this route
export const getProfileAsAdmin = (token, userId) => {
    return dispatch => {
        dispatch(getUserProfileStart());
         axios({
            method : 'get',
            url: Routes.get_a_user + userId,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('getting user data ' ,res.data);
              dispatch(getUserProfileSuccess(res.data))
          })
          .catch(err => {
            console.log('from redux err',err.response.data);
            dispatch(getUserProfileFail(err.response.data))
          })
    }
};





