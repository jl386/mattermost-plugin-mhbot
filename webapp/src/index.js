import React from "react";
import { id as pluginId } from "./manifest";
import Root from "./components/root";
import SidebarRight from "./components/sidebar_right";

import { getLast, setShowRHSAction } from "./actions";
import reducer from "./reducer";

import ChannelHeaderButton from "./components/channel_header_button";

let activityFunc;
let lastActivityTime = Number.MAX_SAFE_INTEGER;
const activityTimeout = 60 * 60 * 1000; // 1 hour

export default class Plugin {
    initialize(registry, store) {
        registry.registerReducer(reducer);
        registry.registerRootComponent(Root);

        registry.register;
        const {
            toggleRHSPlugin,
            showRHSPlugin,
        } = registry.registerRightHandSidebarComponent(
            SidebarRight,
            "Head Coach"
        );
        store.dispatch(setShowRHSAction(() => store.dispatch(showRHSPlugin)));

        registry.registerChannelHeaderButtonAction(
            <ChannelHeaderButton />,
            () => {
                store.dispatch(toggleRHSPlugin);
            },
            "Head Coach",
            "Share how you are feeling today."
        );

        store.dispatch(getLast());

        activityFunc = () => {
            const now = new Date().getTime();
            if (now - lastActivityTime > activityTimeout) {
                store.dispatch(getLast());
            }
            lastActivityTime = now;
        };

        document.addEventListener("click", activityFunc);
    }

    deinitialize() {
        document.removeEventListener("click", activityFunc);
    }
}

window.registerPlugin(pluginId, new Plugin());
