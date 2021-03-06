import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getCausesForReviewStart = () => {
    return {
        type : actionTypes.GET_CAUSE_AS_VOLUNTEER_OR_ADMIN_START
    };
};

export const getCausesForReviewSuccess = (payload) => {
    return {
        type : actionTypes.GET_CAUSE_AS_VOLUNTEER_OR_ADMIN_SUCCESS,
        payload
    };
};

export const getCausesForReviewFail = (error) => {
    return {
        type : actionTypes.GET_CAUSE_AS_VOLUNTEER_OR_ADMIN_FAIL,
        error : error
    };
};

export const reviewCauses = (token) => {
    return dispatch => {
        dispatch(getCausesForReviewStart());
         axios({
            method : 'get',
            url: Routes.review_cause,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(getCausesForReviewSuccess(res.data))
          })
          .catch(err => {
            dispatch(getCausesForReviewFail(err.response.data))
          })
    }
}

export const SetDetails = () => {
    return {
        type : actionTypes.SET_DETAILS
    };
};

export const CauseDetails= (payload) => {
    return {
        type : actionTypes.GET_CAUSE_DETAILS,
        payload
    };
};

export const CauseDetailsFail = (error) => {
    return {
        type : actionTypes.GET_CAUSE_DETAILS_FAIL,
        error : error
    };
};

export const reviewCauseDetails = (token,cause_id) => {
    return dispatch => {
        dispatch(SetDetails());
         axios({
            method : 'get',
            url: Routes.get_cause + cause_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(CauseDetails(res.data))
          })
          .catch(err => {
            dispatch(CauseDetailsFail(err.response.data))
          })
    }
}


export const reviewAsingleCauseStart = () => {
    return {
        type : actionTypes.REVIEW_A_SINGLE_CAUSE_START
    };
};

export const reviewAsingleCauseSuccess = (payload) => {
    return {
        type : actionTypes.REVIEW_A_SINGLE_CAUSE_SUCCESS,
        // idToken: token,
        payload
    };
};

export const reviewAsingleCauseFAIL = (error) => {
    return {
        type : actionTypes.REVIEW_A_SINGLE_CAUSE_FAIL,
        error : error,
    };
};

export const recommendAcourseForApproval  = (reviewer_message,token,cause_id) => {
    return dispatch => {
        dispatch(reviewAsingleCauseStart());
        const formData = {
            reviewer_message
        }
         axios({
            method : 'post',
            url: Routes.review_a_single_cause + cause_id,
            data: formData,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              dispatch(reviewAsingleCauseSuccess(res.data))
          })
          .catch(err => {
            dispatch(reviewAsingleCauseFAIL(err.response.data))
          })
    }
}

