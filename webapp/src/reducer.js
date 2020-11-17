import { combineReducers } from "redux";

import {
    GET_LAST_RATING,
    OPEN_ROOT_MODAL,
    OPEN_TREND_MODAL,
    CLOSE_ROOT_MODAL,
    CLOSE_TREND_MODAL,
    RECEIVED_SHOW_RHS_ACTION,
    UPDATE_RHS_STATE,
    SET_RHS_VISIBLE,
    SET_HIDE_TEAM_SIDEBAR_BUTTONS,
} from "./action_types";

const lastRating = (state = ["No ratings found"], action) => {
    switch (action.type) {
        case GET_LAST_RATING:
            return action.data;
        default:
            return state;
    }
};

const trendModalVisible = (state = false, action) => {
    switch (action.type) {
        case OPEN_TREND_MODAL:
            return true;
        case CLOSE_TREND_MODAL:
            return false;
        default:
            return state;
    }
};

const rootModalVisible = (state = false, action) => {
    switch (action.type) {
        case OPEN_ROOT_MODAL:
            return true;
        case CLOSE_ROOT_MODAL:
            return false;
        default:
            return state;
    }
};

function rhsPluginAction(state = null, action) {
    switch (action.type) {
        case RECEIVED_SHOW_RHS_ACTION:
            return action.showRHSPluginAction;
        default:
            return state;
    }
}

function rhsState(state = "", action) {
    switch (action.type) {
        case UPDATE_RHS_STATE:
            return action.state;
        default:
            return state;
    }
}

function isRhsVisible(state = false, action) {
    switch (action.type) {
        case SET_RHS_VISIBLE:
            return action.payload;
        default:
            return state;
    }
}

function isTeamSidebarHidden(state = false, action) {
    switch (action.type) {
        case SET_HIDE_TEAM_SIDEBAR_BUTTONS:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    lastRating,
    trendModalVisible,
    rootModalVisible,
    rhsState,
    rhsPluginAction,
    isRhsVisible,
    isTeamSidebarHidden,
});
