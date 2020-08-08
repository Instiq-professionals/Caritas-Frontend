import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'



export const deleteCauseStart = () => {
    return {
        type : actionTypes.DELETE_MY_CAUSE_START
    };
};


export const deleteCauseSuccess = (payload) => {
    return {
        type : actionTypes.DELETE_MY_CAUSE_SUCCESS,
        payload
    };
};

export const deleteCauseFail = (error) => {
    return {
        type : actionTypes.DELETE_MY_CAUSE_FAIL,
        error : error
    };
};

export const deleteCause = (token,cause_id) => {
    return dispatch => {
        dispatch(deleteCauseStart());
         axios({
            method : 'get',
            url: Routes.delete_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(deleteCauseSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(deleteCauseFail(err.response.data))
          })
    }
};





