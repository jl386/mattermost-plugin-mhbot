import { getConfig } from "mattermost-redux/selectors/entities/general";
import { Client4 } from "mattermost-redux/client";
import * as UserActions from "mattermost-redux/actions/users";

import { id as pluginId } from "./manifest";
import {
    OPEN_ROOT_MODAL,
    CLOSE_ROOT_MODAL,
    TRENDVIEW,
    RECEIVED_SHOW_RHS_ACTION,
    UPDATE_RHS_STATE,
    SET_RHS_VISIBLE,
    SET_HIDE_TEAM_SIDEBAR_BUTTONS,
    GET_LAST_RATING,
} from "./action_types";

export const openRootModal = (enableTrend) => (dispatch) => {
    if (enableTrend == true) {
        dispatch({
            type: TRENDVIEW,
            trendView: enableTrend,
        });
    }
    dispatch({
        type: OPEN_ROOT_MODAL,
    });
};

export const closeRootModal = () => (dispatch) => {
    dispatch({
        type: CLOSE_ROOT_MODAL,
    });
};

/**
 * Stores`showRHSPlugin` action returned by
 * registerRightHandSidebarComponent in plugin initialization.
 */
export function setShowRHSAction(showRHSPluginAction) {
    return {
        type: RECEIVED_SHOW_RHS_ACTION,
        showRHSPluginAction,
    };
}

export function setRhsVisible(payload) {
    return {
        type: SET_RHS_VISIBLE,
        payload,
    };
}

export function updateRhsState(rhsState) {
    return {
        type: UPDATE_RHS_STATE,
        state: rhsState,
    };
}

// TODO: Move this into mattermost-redux or mattermost-webapp.
export const getPluginServerRoute = (state) => {
    const config = getConfig(state);

    let basePath = "";
    if (config && config.SiteURL) {
        basePath = new URL(config.SiteURL).pathname;

        if (basePath && basePath[basePath.length - 1] === "/") {
            basePath = basePath.substr(0, basePath.length - 1);
        }
    }

    return basePath + "/plugins/" + pluginId;
};

export const share = (score, notes) => async (dispatch, getState) => {
    score = parseInt(score);
    await fetch(
        getPluginServerRoute(getState()) + "/add",
        Client4.getOptions({
            method: "post",
            body: JSON.stringify({ score, notes }),
        })
    );
    dispatch(getLast());
};

export const vote = (score) => async (dispatch, getState) => {
    score = parseInt(score);
    await fetch(
        getPluginServerRoute(getState()) + "/add",
        Client4.getOptions({
            method: "post",
            body: JSON.stringify({ score }),
        })
    );
};

export const add = (message, sendTo, postID) => async (dispatch, getState) => {
    await fetch(
        getPluginServerRoute(getState()) + "/add",
        Client4.getOptions({
            method: "post",
            body: JSON.stringify({ message, send_to: sendTo, post_id: postID }),
        })
    );
};

export const getLast = () => async (dispatch, getState) => {
    let resp;
    let data;
    try {
        resp = await fetch(
            getPluginServerRoute(getState()) + "/getlast",
            Client4.getOptions({
                method: "get",
            })
        );
        data = await resp.json();
    } catch (error) {
        return { error };
    }

    let actionType = GET_LAST_RATING;
    dispatch({
        type: actionType,
        data,
    });

    return { data };
};

export function setHideTeamSidebar(payload) {
    return {
        type: SET_HIDE_TEAM_SIDEBAR_BUTTONS,
        payload,
    };
}

export const updateConfig = () => async (dispatch, getState) => {
    let resp;
    let data;
    try {
        resp = await fetch(
            getPluginServerRoute(getState()) + "/config",
            Client4.getOptions({
                method: "get",
            })
        );
        data = await resp.json();
    } catch (error) {
        return { error };
    }

    dispatch(setHideTeamSidebar(data.hide_team_sidebar));

    return { data };
};
