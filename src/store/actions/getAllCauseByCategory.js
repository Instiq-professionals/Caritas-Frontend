import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const getAllCausesByCategoryStart = () => {
    return {
        type : actionTypes.GET_ALL_CAUSES_BY_CATEGORY_START
    };
};

export const getAllCausesByCategorySuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_CAUSES_BY_CATEGORY_SUCCESS,
        payload
    };
};

export const getAllCausesByCategoryFail = (error) => {
    return {
        type : actionTypes.GET_ALL_CAUSES_BY_CATEGORY_FAIL,
        error : error
    };
};

export const getAllCausesByCategory = (category) => {
    return dispatch => {
        dispatch(getAllCausesByCategoryStart());
         axios({
            method : 'get',
            url: Routes.get_causes_by_category + category,
          })
          .then(res => {
              dispatch(getAllCausesByCategorySuccess(res.data))
          })
          .catch(err => {
            dispatch(getAllCausesByCategoryFail(err.response.data))
          })
    }
}

