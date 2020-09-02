import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const createAnEventStart = () => {
    return {
        type : actionTypes.CREATE_AN_EVENT_START
    };
};

export const createAnEventSuccess = (payload) => {
    return {
        type : actionTypes.CREATE_AN_EVENT_SUCCESS,
        payload
    };
};

export const createAnEventFail = (error) => {
    return {
        type : actionTypes.CREATE_AN_EVENT_FAIL,
        error : error
    };
};

export const createAnEvent = (token,content,uploadFiles) => {
    return dispatch => {
        dispatch(createAnEventStart());
        const formData = new FormData();
        formData.append("title", content.title);
        formData.append("category", content.category);
        formData.append("description", content.description);
        formData.append("budget", content.budget);
        formData.append("budget_breakdown", content.budget_breakdown);
        formData.append("event_date", content.event_date);
        formData.append("venue", content.venue);
        formData.append("expected_no_of_impact", content.expected_no_of_impact);
        formData.append("video", content.video);
        formData.append("pictures", uploadFiles.image1);
        if (uploadFiles.image2) {
          formData.append("pictures", uploadFiles.image2);
        }
        if (uploadFiles.image3) {
          formData.append("pictures", uploadFiles.image3);
        }
        if (uploadFiles.image4) {
          formData.append("pictures", uploadFiles.image4);
        }
        if (uploadFiles.image5) {
          formData.append("pictures", uploadFiles.image5);
        }
        if (uploadFiles.image6) {
          formData.append("pictures", uploadFiles.image6);
        }
         axios({
            method : 'post',
            data: formData,
            url: Routes.create_an_event,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(createAnEventSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(createAnEventFail(err.response.data))
          })
    }
}


export const getAllMyEventsStart = () => {
    return {
        type : actionTypes.GET_ALL_MY_EVENTS_START
    };
};

export const getAllMyEventsSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_MY_EVENTS_SUCCESS,
        payload
    };
};

export const getAllMyEventsFail = (error) => {
    return {
        type : actionTypes.GET_ALL_MY_EVENTS_FAIL,
        error : error
    };
};

export const getAllMyEvents = (token) => {
    return dispatch => {
        dispatch(getAllMyEventsStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_events_by_user,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(getAllMyEventsSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getAllMyEventsFail(err.response.data))
          })
    }
}

//This endpoint does not require authentication, the id must be appended
export const checkEventDetailStart = () => {
    return {
        type : actionTypes.CHECK_EVENT_DETAILS_START
    };
};


export const checkEventDetailSuccess = (payload) => {
    return {
        type : actionTypes.CHECK_EVENT_DETAILS_SUCCESS,
        payload
    };
};

export const checkEventDetailFail = (error) => {
    return {
        type : actionTypes.CHECK_EVENT_DETAILS_FAIL,
        error : error
    };
};

export const checkEventDetails = (event_id) => {
    return dispatch => {
        dispatch(checkEventDetailStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_single_event + event_id,
          })
          .then(res => {
              console.log(res.data);
              dispatch(checkEventDetailSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(checkEventDetailFail(err.response.data))
          })
    }
};


export const editMyEventStart = () => {
    return {
        type : actionTypes.EDIT_EVENT_START
    };
};


export const editMyEventSuccess = (payload) => {
    return {
        type : actionTypes.EDIT_EVENT_SUCCESS,
        payload
    };
};

export const editMyEventFail = (error) => {
    return {
        type : actionTypes.EDIT_EVENT_FAIL,
        error : error
    };
};

export const editMyEvent = (token,event_id,content) => {
    return dispatch => {
        dispatch(editMyEventStart());
        const formData = new FormData();
        formData.append("title", content.title);
        formData.append("category", content.category);
        formData.append("description", content.description);
        formData.append("budget", content.budget);
        formData.append("budget_breakdown", content.budget_breakdown);
        formData.append("event_date", content.event_date);
        formData.append("venue", content.venue);
        formData.append("expected_no_of_impact", content.expected_no_of_impact);
        formData.append("video", content.video);
        if (content.uploadFiles.image1) {
            formData.append("pictures", content.uploadFiles.image1);
        }
        if (content.uploadFiles.image2) {
            formData.append("pictures", content.uploadFiles.image2);
          }
          if (content.uploadFiles.image3) {
            formData.append("pictures", content.uploadFiles.image3);
          }
          if (content.uploadFiles.image4) {
            formData.append("pictures", content.uploadFiles.image4);
          }
          if (content.uploadFiles.image5) {
            formData.append("pictures", content.uploadFiles.image5);
          }
          if (content.uploadFiles.image6) {
            formData.append("pictures", content.uploadFiles.image6);
          }
         axios({
            method : 'put',
            data: formData,
            url: Routes.edit_event + event_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(editMyEventSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response);
            dispatch(editMyEventFail(err.response.data))
          })
    }
};

export const deleteMyEventStart = (id) => {
    return {
        type : actionTypes.DELETE_MY_EVENT_START ,
        id
    };
};

export const deleteMyEventSuccess = (payload,id) => {
    return {
        type : actionTypes.DELETE_MY_EVENT_SUCCESS,
        deletedStatus: payload.status,
        deletedMessage: payload.message,
        id
    };
};

export const deleteMyEventFail = (error) => {
    return {
        type : actionTypes.DELETE_MY_EVENT_FAIL,
        error : error
    };
};

export const deleteMyEvent = (token,event_id) => {
    return dispatch => {
        dispatch(deleteMyEventStart(event_id));
         axios({
            method : 'delete',
            url: Routes.delete_event + event_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(deleteMyEventSuccess(res.data,event_id))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(deleteMyEventFail(err.response.data))
          })
    }
};

//This endpoint fetches all approved events and it doesnt require authentication
export const getAllEventsStart = () => {
    return {
        type : actionTypes.GET_ALL_EVENTS_START
    };
};

export const getAllEventsSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_SUCCESS,
        payload
    };
};

export const getAllEventsFail = (error) => {
    return {
        type : actionTypes.GET_ALL_EVENTS_FAIL,
        error : error
    };
};

export const getAllEvents = () => {
    return dispatch => {
        dispatch(getAllEventsStart());
         axios({
            method : 'get',
            url: Routes.fetch_all_event,
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(getAllEventsSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getAllEventsFail(err.response.data))
          })
    }
}





