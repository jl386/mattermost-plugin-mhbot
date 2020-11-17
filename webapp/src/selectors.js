import { id as pluginId } from "./manifest";

const getPluginState = (state) => state["plugins-" + pluginId] || {};

export const getLastRating = (state) => getPluginState(state).lastRating;

export const isRootModalVisible = (state) =>
    getPluginState(state).rootModalVisible;

export const trendView = (state) => getPluginState(state).trendView;

export const getShowRHSAction = (state) =>
    getPluginState(state).rhsPluginAction;

export const getSiteURL = () => {
    let siteURL =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    if (window.location.origin) {
        siteURL = window.location.origin;
    }

    if (siteURL[siteURL.length - 1] === "/") {
        siteURL = siteURL.substring(0, siteURL.length - 1);
    }

    if (window.basename) {
        siteURL += window.basename;
    }

    if (siteURL[siteURL.length - 1] === "/") {
        siteURL = siteURL.substring(0, siteURL.length - 1);
    }

    return siteURL;
};

export const isRhsVisible = (state) => getPluginState(state).isRhsVisible;
