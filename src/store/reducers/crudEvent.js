import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    events : null,
    event : null,
    editData: null,
    editError: null,
    error : null,
    deletedStatus: null,
    deletedMessage:null,
    editStatus: null,
    editMessage: null,
    event_id:null,
    loading : false,
    modalopen: false
};

const createMyEventStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const createMyEventSuccess = (state, action) => {
    return updatedObject(state, {
        event: action.payload,
        error: null,
        loading : false,
        modalopen: true
    })
};

const createMyEventFail = (state, action) => {
    return updatedObject(state, {
        event: null,
        error: action.error,
        loading : false,
        modalopen: true
    })
};


const getMyeventsStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getMyeventsSuccess = (state, action) => {
    return updatedObject(state, {
        events: action.payload,
        error: null,
        loading : false,
        modalopen: false
    });
};

const getMyeventsFail = (state, action) => {
    return updatedObject(state, {
        events: null,
        error: action.error,
        loading : false
    })
};


const checkMyEventDetailsStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const checkMyEventDetailsSuccess = (state, action) => {
    return updatedObject(state, {
        event: action.payload,
        error: null,
        loading : false
    })
};

const checkMyEventDetailsFail = (state, action) => {
    return updatedObject(state, {
        event: null,
        error: action.error,
        loading : false
    })
};

const editMyEventStart = (state, action) => {
    return updatedObject(state, {editError: null, loading:true})
};

const editMyEventSuccess = (state, action) => {
    return updatedObject(state, {
        editData: action.payload,
        editError: null,
        editStatus: action.payload.status,
        editMessage: action.payload.message,
        loading : false,
        modalopen: true
    })
};

const editMyEventFail = (state, action) => {
    return updatedObject(state, {
        editStatus: null,
        editMessage: null,
        editError: action.error,
        loading : false,
        modalopen: true
    })
}

const deleteEventStart = (state, action) => {
    return updatedObject(state, {error: null,event_id:action.id,loading:true})
};

const deleteEventSuccess = (state, action) => {
    const updatedArray = state.events.data.filter(event => event._id !== action.id);
    return updatedObject(state, {
        events: updatedArray,
        error: null,
        event_id:null,
        deletedStatus: action.deletedStatus,
        deletedMessage:action.deletedMessage,
        loading : false
    })
};

const deleteEventFail = (state, action) => {
    return updatedObject(state, {
        deletedStatus: null,
        deletedMessage:null,
        error: action.error,
        loading : false
    })
};

const getAllEventsStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getAllEventsSuccess = (state, action) => {
    return updatedObject(state, {
        events: action.payload,
        error: null,
        loading : false
    });
};

const getAllEventsFail = (state, action) => {
    return updatedObject(state, {
        events: null,
        error: action.error,
        loading : false
    })
};

export const crudEvent = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_AN_EVENT_START: return createMyEventStart(state, action);
        case actionTypes.CREATE_AN_EVENT_SUCCESS: return createMyEventSuccess(state, action);
        case actionTypes.CREATE_AN_EVENT_FAIL: return createMyEventFail(state, action);
        case actionTypes.GET_ALL_MY_EVENTS_START: return getMyeventsStart(state, action);
        case actionTypes.GET_ALL_MY_EVENTS_SUCCESS: return getMyeventsSuccess(state, action);
        case actionTypes.GET_ALL_MY_EVENTS_FAIL: return getMyeventsFail(state, action);
        case actionTypes.CHECK_EVENT_DETAILS_START: return checkMyEventDetailsStart(state, action);
        case actionTypes.CHECK_EVENT_DETAILS_SUCCESS: return checkMyEventDetailsSuccess(state, action);
        case actionTypes.CHECK_EVENT_DETAILS_FAIL: return checkMyEventDetailsFail(state, action);
        case actionTypes.EDIT_EVENT_START: return editMyEventStart(state,action);
        case actionTypes.EDIT_EVENT_SUCCESS: return editMyEventSuccess(state,action);
        case actionTypes.EDIT_EVENT_FAIL: return editMyEventFail(state,action);
        case actionTypes.DELETE_MY_EVENT_START: return deleteEventStart(state,action);
        case actionTypes.DELETE_MY_EVENT_SUCCESS: return deleteEventSuccess(state,action);
        case actionTypes.DELETE_MY_EVENT_FAIL: return deleteEventFail(state,action);
        case actionTypes.GET_ALL_EVENTS_START: return getAllEventsStart(state, action);
        case actionTypes.GET_ALL_EVENTS_SUCCESS: return getAllEventsSuccess(state, action);
        case actionTypes.GET_ALL_EVENTS_FAIL: return getAllEventsFail(state, action);
        default: return state
    }
}

