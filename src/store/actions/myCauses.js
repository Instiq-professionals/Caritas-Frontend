import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllMyCausesStart = () => {
    return {
        type : actionTypes.GET_MY_CAUSES_START
    };
};

export const getAllMyCausesSuccess = (payload) => {
    return {
        type : actionTypes.GET_MY_CAUSES_SUCCESS,
        payload
    };
};

export const getAllMyCausesFail = (error) => {
    return {
        type : actionTypes.GET_MY_CAUSES_FAIL,
        error : error
    };
};

export const getAllMyCauses = (token) => {
    return dispatch => {
        dispatch(getAllMyCausesStart());
         axios({
            method : 'get',
            url: Routes.get_all_causes_by_a_user,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(getAllMyCausesSuccess(res.data))
          })
          .catch(err => {
            dispatch(getAllMyCausesFail(err.response.data))
          })
    }
}

export const checkCauseDetailStart = () => {
    return {
        type : actionTypes.GET_MY_CAUSE_DETAILS_START
    };
};


export const checkCauseDetailSuccess = (payload) => {
    return {
        type : actionTypes.GET_MY_CAUSE_DETAILS_SUCCESS,
        payload
    };
};

export const checkCauseDetailFail = (error) => {
    return {
        type : actionTypes.GET_MY_CAUSE_DETAILS_FAIL,
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
              dispatch(checkCauseDetailSuccess(res.data))
          })
          .catch(err => {
            dispatch(checkCauseDetailFail(err.response.data))
          })
    }
};

export const deleteCauseStart = (id) => {
    return {
        type : actionTypes.DELETE_MY_CAUSE_START,
        id
    };
};


export const deleteCauseSuccess = (payload,id) => {
    return {
        type : actionTypes.DELETE_MY_CAUSE_SUCCESS,
        deletedStatus: payload.status,
        deletedMessage: payload.message,
        id
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
        dispatch(deleteCauseStart(cause_id));
         axios({
            method : 'delete',
            url: Routes.delete_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(deleteCauseSuccess(res.data,cause_id))
          })
          .catch(err => {
            // console.log(err.response.data);
            // dispatch(deleteCauseFail(err.response.data))
          })
    }
};


export const editCauseStart = () => {
    return {
        type : actionTypes.EDIT_MY_CAUSE_START
    };
};


export const editCauseSuccess = (payload) => {
    return {
        type : actionTypes.EDIT_MY_CAUSE_SUCCESS,
        payload
    };
};

export const editCauseFail = (error) => {
    return {
        type : actionTypes.EDIT_MY_CAUSE_FAIL,
        error : error
    };
};

export const editCause = (token,cause_id,cause) => {
    return dispatch => {
        dispatch(editCauseStart());
        const formData = new FormData();
        formData.append("cause_title", cause.cause_title);
        formData.append("amount_required", parseInt(cause.amount_required));
        formData.append("brief_description", cause.brief_description);
        formData.append("bank", cause.bank);
        formData.append("account_number", cause.account_number);
        formData.append("category", cause.category);
        
        //formData.append("amount_required", cause.amount_required);
        formData.append("cause_photos", cause.uploadFiles.image1);
        if (cause.uploadFiles.image2) {
          formData.append("cause_photos", cause.uploadFiles.image2);
        }
        if (cause.uploadFiles.image3) {
          formData.append("cause_photos", cause.uploadFiles.image3);
        }
        if (cause.uploadFiles.image4) {
          formData.append("cause_photos", cause.uploadFiles.image4);
        }
        if (cause.uploadFiles.image5) {
          formData.append("cause_photos", cause.uploadFiles.image5);
        }
        if (cause.uploadFiles.image6) {
          formData.append("cause_photos", cause.uploadFiles.image6);
        }
        if (cause.first_name) {
        formData.append("first_name", cause.first_name);
        formData.append("middle_name", cause.middle_name);
        formData.append("last_name", cause.last_name);
        formData.append("address", cause.address);
        formData.append("gender", cause.gender);
        formData.append("local_government", cause.local_government);
        }
         axios({
            method : 'put',
            data: formData,
            url: Routes.edit_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(editCauseSuccess(res.data))
          })
          .catch(err => {
            dispatch(editCauseFail(err.response.message))
          })
    }
};



