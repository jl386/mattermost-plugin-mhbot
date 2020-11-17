// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getLastRating, getSiteURL } from "../../selectors";
import {
    openRootModal,
    openTrendModal,
    setRhsVisible,
    getLast,
    vote,
    share,
} from "../../actions";
import { getCurrentUser } from "mattermost-redux/selectors/entities/users";
import SidebarRight from "./sidebar_right.jsx";

function mapStateToProps(state) {
    return {
        lastRating: getLastRating(state),
        currentUser: getCurrentUser(state),
        siteURL: getSiteURL(),
        rhsState: state["plugins-headcoach"].rhsState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                getLast,
                vote,
                share,
                openRootModal,
                openTrendModal,
                setVisible: setRhsVisible,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);
