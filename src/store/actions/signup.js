import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const accountDetails = (payload) => {
    return {
        type : actionTypes.ACCOUNT_DETAILS,
        payload
    }
}

export const gatherPersonalDetails = (payload) => {
    return {
        type : actionTypes.GATHER_PERSONAL_DETAILS,
        payload
    };
};

export const regStart = () => {
    return {
        type : actionTypes.REG_START
    };
};

export const regSuccess = (payload) => {
    localStorage.removeItem('errorMsg');
    return {
        type : actionTypes.REG_SUCCESS,
        // idToken: token,
        payload
    };
};

export const regFAIL = (error) => {
    return {
        type : actionTypes.REG_FAIL,
        error : error,
    };
};



export const authSignUp = (reg_credential,email,password,first_name,last_name,role,address,date_of_birth,local_govt,state,title,staff_strength,photo,category,company,position,religion,guarantor_name,relationship_with_guarantor,guarantor_address,guarantor_company,guarantor_position,highest_education_level,criminal_record) => {
    return dispatch => {
        dispatch(regStart());
        const authData = {
            password,first_name,last_name,role,address,email,
            date_of_birth,reg_credential,local_govt,state,title,
            staff_strength,photo,category,company,position,religion,guarantor_name,
            relationship_with_guarantor,guarantor_address,guarantor_company,
            guarantor_position,highest_education_level,criminal_record
        }
        axios.post(Routes.register, authData)
        .then(res => {
            //console.log(res.data);
            dispatch(regSuccess(res.data));
        })
        .catch(err => {
            localStorage.setItem('errorMsg', err.response.data.message);
            console.log(err.response.data);
            dispatch(regFAIL(err.response.data));
        })
    }
};