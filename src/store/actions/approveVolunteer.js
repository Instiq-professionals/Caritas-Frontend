import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getVolunteerForApprovalStart = () => {
    return {
        type : actionTypes.GET_VOLUNTEERS_FOR_APPROVAL_START
    };
};

export const getVolunteerForApprovalSuccess = (payload) => {
    return {
        type : actionTypes.GET_VOLUNTEERS_FOR_APPROVAL_SUCCESS,
        payload
    };
};

export const getVolunteerForApprovalFail = (error) => {
    return {
        type : actionTypes.GET_VOLUNTEERS_FOR_APPROVAL_FAIL,
        error : error
    };
};

export const getVolunteersForApproval = (token) => {
    return dispatch => {
        getVolunteerForApprovalStart();
         axios({
            method : 'get',
            url: Routes.get_all_volunteers_for_approval,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(getVolunteerForApprovalSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getVolunteerForApprovalFail(err.response.data))
          })
    }
}

export const checkVolunteerDetailStart = () => {
    return {
        type : actionTypes.GET_VOLUNTEER_DETAILS_FOR_APPROVAL_START
    };
};


export const checkVolunteerDetailSuccess = (payload) => {
    return {
        type : actionTypes.GET_VOLUNTEER_DETAILS_FOR_APPROVAL_SUCCESS,
        payload
    };
};

export const checkVolunteerDetailFail = (error) => {
    return {
        type : actionTypes.GET_VOLUNTEER_DETAILS_FOR_APPROVAL_FAIL,
        error : error
    };
};

export const checkVolunteerDetails = (token,volunteer_id) => {
    return dispatch => {
        dispatch(checkVolunteerDetailStart());
         axios({
            method : 'get',
            url: Routes.get_volunteer_details_for_approval + volunteer_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(checkVolunteerDetailSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(checkVolunteerDetailFail(err.response.data))
          })
    }
}


export const makeDecisionOnVolunteerStart = () => {
    return {
        type : actionTypes.ACCEPT_OR_REJECT_A_VOLUNTEER_START
    };
};

export const makeDecisionOnVolunteerSuccess = (payload) => {
    return {
        type : actionTypes.ACCEPT_OR_REJECT_A_VOLUNTEER_SUCCESS,
        // idToken: token,
        payload
    };
};

export const makeDecisionOnVolunteerFAIL = (error) => {
    return {
        type : actionTypes.ACCEPT_OR_REJECT_A_VOLUNTEER_FAIL,
        error : error,
    };
};

export const approveVolunteer  = (token,volunteer_id) => {
    return dispatch => {
        dispatch(makeDecisionOnVolunteerStart());
         axios({
            method : 'post',
            url: Routes.approve_volunteer + volunteer_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(makeDecisionOnVolunteerSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(makeDecisionOnVolunteerFAIL(err.response.data))
          })
    }
};

export const disApproveVolunteer  = (reason_for_disapproval,token,volunteer_id) => {
    return dispatch => {
        dispatch(makeDecisionOnVolunteerStart());
        const formData = {
            reason_for_disapproval
        }
         axios({
            method : 'post',
            url: Routes.disapprove_volunteer + volunteer_id,
            data: formData,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(makeDecisionOnVolunteerSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(makeDecisionOnVolunteerFAIL(err.response.data))
          })
    }
}


