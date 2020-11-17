// Taken from https://github.com/mattermost/mattermost-plugin-todo/tree/master/webapp/src/components/channel_header_button

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { isRhsVisible } from "selectors";

import { showRHSPlugin } from "actions";

import ChannelHeaderButton from "./channel_header_button";

function mapStateToProps(state) {
    return {
        shouldHighlight: isRhsVisible(state),
    };
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(
            {
                showRHSPlugin,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProp)(ChannelHeaderButton);
