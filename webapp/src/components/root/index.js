import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closeRootModal } from "actions";
import { isRootModalVisible, trendView } from "selectors";

import Root from "./root";

const mapStateToProps = (state) => ({
    visible: isRootModalVisible(state),
    trendView: trendView(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            close: closeRootModal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Root);
