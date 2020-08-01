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



export const authSignUp = (reg_credential,email,phone_number,password,first_name,last_name,role,address,date_of_birth,local_govt,state,title,staff_strength,photo,category,company,position,religion,guarantor_name,relationship_with_guarantor,guarantor_address,guarantor_company,guarantor_position,highest_education_level,criminal_record) => {
    return dispatch => {
        dispatch(regStart());
        const formData = new FormData();

        formData.append("password", password);
        formData.append("phone_number", phone_number);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("role", role);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("date_of_birth", date_of_birth);
        formData.append("reg_credential", reg_credential);
        formData.append("local_govt", local_govt);
        formData.append("state", state);
        formData.append("title", title);
        formData.append("staff_strength", staff_strength);
        formData.append("photo", photo);
        formData.append("category", category);
        formData.append("company", company);
        formData.append("position", position);
        formData.append("religion", religion);
        formData.append("guarantor_name", guarantor_name);
        formData.append("relationship_with_guarantor", relationship_with_guarantor);
        formData.append("guarantor_address", guarantor_address);
        formData.append("guarantor_company", guarantor_company);
        formData.append("guarantor_position", guarantor_position);
        formData.append("highest_education_level", highest_education_level);
        formData.append("criminal_record", criminal_record);

        axios.post(Routes.register, formData)
        .then(res => {
            dispatch(regSuccess(res.data));
        })
        .catch(err => {
            localStorage.setItem('errorMsg', err.response.data.message);
            console.log(err.response.data);
            dispatch(regFAIL(err.response.data));
        })
    }
};