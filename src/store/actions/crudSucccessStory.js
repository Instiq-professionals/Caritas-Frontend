import * as actionTypes from './actionsTypes';
import { Routes } from "../../constants/index";
import axios from 'axios'

export const createMySuccessStoryStart = () => {
    return {
        type : actionTypes.CREATE_MY_SUCCESS_STORY_START
    };
};

export const createMySuccessStorySuccess = (payload) => {
    return {
        type : actionTypes.CREATE_MY_SUCCESS_STORY_SUCCESS,
        payload
    };
};

export const createMySuccessStoryFail = (error) => {
    return {
        type : actionTypes.CREATE_MY_SUCCESS_STORY_FAIL,
        error : error
    };
};

export const createMySuccessStory = (token,cause_id,testimonial,uploadFiles) => {
    return dispatch => {
        dispatch(createMySuccessStoryStart());
        const formData = new FormData();
        formData.append("testimonial", testimonial);
        formData.append("cause_id", cause_id);
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
            url: Routes.create_success_story,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(createMySuccessStorySuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(createMySuccessStoryFail(err.response.data))
          })
    }
}


export const getAllMySuccessStoriesStart = () => {
    return {
        type : actionTypes.GET_MY_SUCCESS_STORIES_START
    };
};

export const getAllMySuccessStoriesSuccess = (payload) => {
    return {
        type : actionTypes.GET_MY_SUCCESS_STORIES_SUCCESS,
        payload
    };
};

export const getAllMySuccessStoriesFail = (error) => {
    return {
        type : actionTypes.GET_MY_SUCCESS_STORIES_FAIL,
        error : error
    };
};

export const getAllMySuccessStories = (token) => {
    return dispatch => {
        dispatch(getAllMySuccessStoriesStart());
         axios({
            method : 'get',
            url: Routes.get_my_success_stories,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(getAllMySuccessStoriesSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getAllMySuccessStoriesFail(err.response.data))
          })
    }
}

export const checkSuccessStoryDetailStart = () => {
    return {
        type : actionTypes.CHECK_SUCCESS_STORY_DETAILS_START
    };
};


export const checkSuccessStoryDetailSuccess = (payload) => {
    return {
        type : actionTypes.CHECK_SUCCESS_STORY_DETAILS_SUCCESS,
        payload
    };
};

export const checkSuccessStoryDetailFail = (error) => {
    return {
        type : actionTypes.CHECK_SUCCESS_STORY_DETAILS_FAIL,
        error : error
    };
};

export const checkSuccessStoryDetails = (cause_id) => {
    return dispatch => {
        dispatch(checkSuccessStoryDetailStart());
         axios({
            method : 'get',
            url: Routes.get_single_success_story + cause_id,
          })
          .then(res => {
              console.log(res.data);
              dispatch(checkSuccessStoryDetailSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(checkSuccessStoryDetailFail(err.response.data))
          })
    }
};


export const editMySuccessStoryStart = () => {
    return {
        type : actionTypes.EDIT_MY_SUCCESS_STORY_START
    };
};


export const editMySuccessStorySuccess = (payload) => {
    return {
        type : actionTypes.EDIT_MY_SUCCESS_STORY_SUCCESS,
        payload
    };
};

export const editMySuccessStoryFail = (error) => {
    return {
        type : actionTypes.EDIT_MY_SUCCESS_STORY_FAIL,
        error : error
    };
};

export const editMySuccessStory = (token,story_id,story) => {
    return dispatch => {
        dispatch(editMySuccessStoryStart());
        const formData = new FormData();
        formData.append("testimonial", story.testimonial);
        formData.append("cause_photos", story.uploadFiles.image1);
        if (story.uploadFiles.image2) {
          formData.append("cause_photos", story.uploadFiles.image2);
        }
        if (story.uploadFiles.image3) {
          formData.append("cause_photos", story.uploadFiles.image3);
        }
        if (story.uploadFiles.image4) {
          formData.append("cause_photos", story.uploadFiles.image4);
        }
        if (story.uploadFiles.image5) {
          formData.append("cause_photos", story.uploadFiles.image5);
        }
        if (story.uploadFiles.image6) {
          formData.append("cause_photos", story.uploadFiles.image6);
        }
         axios({
            method : 'put',
            data: formData,
            url: Routes.edit_my_success_story + story_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(editMySuccessStorySuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.message);
            dispatch(editMySuccessStoryFail(err.response.message))
          })
    }
};

export const deleteMySuccessStoryStart = (id) => {
    return {
        type : actionTypes.DELETE_MY_SUCCESS_STORY_START ,
        id
    };
};

export const deleteMySuccessStorySuccess = (payload,id) => {
    return {
        type : actionTypes.DELETE_MY_SUCCESS_STORY_SUCCESS,
        deletedStatus: payload.status,
        deletedMessage: payload.message,
        id
    };
};

export const deleteMySuccessStoryFail = (error) => {
    return {
        type : actionTypes.DELETE_MY_SUCCESS_STORY_FAIL,
        error : error
    };
};

export const deleteMySuccessStory = (token,story_id) => {
    return dispatch => {
        dispatch(deleteMySuccessStoryStart(story_id));
         axios({
            method : 'delete',
            url: Routes.delete_my_success_story + story_id,
            headers : {
              'x-auth-token' : token
            }
          })
          .then(res => {
              console.log(res.data);
              dispatch(deleteMySuccessStorySuccess(res.data,story_id))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(deleteMySuccessStoryFail(err.response.data))
          })
    }
};

export const getAllSuccessStoriesStart = () => {
    return {
        type : actionTypes.GET_ALL_SUCCESS_STORIES_START
    };
};

export const getAllSuccessStoriesSuccess = (payload) => {
    return {
        type : actionTypes.GET_ALL_SUCCESS_STORIES_SUCCESS,
        payload
    };
};

export const getAllSuccessStoriesFail = (error) => {
    return {
        type : actionTypes.GET_ALL_SUCCESS_STORIES_FAIL,
        error : error
    };
};

export const getAllSuccessStories = () => {
    return dispatch => {
        dispatch(getAllSuccessStoriesStart());
         axios({
            method : 'get',
            url: Routes.get_all_success_stories,
          })
          .then(res => {
              console.log('...........',res.data);
              dispatch(getAllSuccessStoriesSuccess(res.data))
          })
          .catch(err => {
            console.log(err.response.data);
            dispatch(getAllSuccessStoriesFail(err.response.data))
          })
    }
}





