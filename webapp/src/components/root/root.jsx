import React from "react";
import PropTypes from "prop-types";

import {
  makeStyleFromTheme,
  changeOpacity,
} from "mattermost-redux/utils/theme_utils";

import FullScreenModal from "../modals/full_screen_modal.jsx";
import ReflectionModal from "../modals/reflection_modal.jsx";

import "./root.scss";

export default class Root extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      sendTo: null,
      attachToThread: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible && state.message == null) {
      return { message: props.message };
    }
    if (!props.visible && (state.message != null || state.sendTo != null)) {
      return { message: null, sendTo: null, attachToThread: false };
    }
    return null;
  }

  render() {
    const { visible, theme, close } = this.props;

    if (!visible) {
      return null;
    }

    const style = getStyle(theme);

    return (
      <FullScreenModal show={visible} onClose={close}>
        <div style={style.modal} className="ToDoPluginRootModal">
          <h1>{"Mental Health Coach"}</h1>
        </div>
      </FullScreenModal>
    );
  }
}

const getStyle = makeStyleFromTheme((theme) => {
  return {
    modal: {
      color: changeOpacity(theme.centerChannelColor, 0.88),
    },
    textarea: {
      backgroundColor: theme.centerChannelBg,
    },
    helpText: {
      color: changeOpacity(theme.centerChannelColor, 0.64),
    },
    button: {
      color: theme.buttonColor,
      backgroundColor: theme.buttonBg,
    },
    inactiveButton: {
      color: changeOpacity(theme.buttonColor, 0.88),
      backgroundColor: changeOpacity(theme.buttonBg, 0.32),
    },
  };
});
