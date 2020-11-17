import React from "react";
import PropTypes from "prop-types";

import {
  makeStyleFromTheme,
  changeOpacity,
} from "mattermost-redux/utils/theme_utils";

import FullScreenModal from "../modals/full_screen_modal.jsx";
import ReflectionModal from "../modals/reflection_modal.jsx";

import "./root.scss";

import ExcellentSvg from "images/1_excellent.svg";
import GoodSvg from "images/2_good.svg";
import AverageSvg from "images/3_average.svg";
import PoorSvg from "images/4_poor.svg";
import TerribleSvg from "images/5_terrible.svg";

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
          <h1>Mental Health Coach</h1>
          <blockquote>
            Ninety percent of workers have been touched by mental health
            challenges, either personally or through someone they are close to
            <cite>
              [
              <a
                href="https://www.accenture.com/_acnmedia/pdf-90/accenture-tch-its-all-of-us-research-updated-report.pdf"
                target="_blank"
              >
                1
              </a>
              ]
            </cite>
          </blockquote>
          <h3>How are you feeling today?</h3>
          <div className="choices">
            <div className="choices-img">
              <img
                className=""
                src={ExcellentSvg}
                alt="Excellent Emoticon"
                width="64"
                height="64"
              />
              <div className="choices-label">Excellent</div>
            </div>
            <div className="choices-img">
              <img
                className=""
                src={GoodSvg}
                alt="Good Emoticon"
                width="64"
                height="64"
              />
              <div className="choices-label">Good</div>
            </div>
            <div className="choices-img">
              <img
                className=""
                src={AverageSvg}
                alt="Average Emoticon"
                width="64"
                height="64"
              />
              <div className="choices-label">Average</div>
            </div>
            <div className="choices-img">
              <img
                className=""
                src={PoorSvg}
                alt="Poor Emoticon"
                width="64"
                height="64"
              />
              <div className="choices-label">Poor</div>
            </div>
            <div className="choices-img">
              <img
                className=""
                src={TerribleSvg}
                alt="Terrible Emoticon"
                width="64"
                height="64"
              />
              <div className="choices-label">Terrible</div>
            </div>
          </div>
          <div className="information">
            <h3>How does it work?</h3>
            <div>
              The Mental Health Coach plugin helps you to take a moment from
              your day to reflect on how you are feeling. The coach will remind
              you every morning to rate your emotional health. You can also make
              a note of any specific factors that are contributing to your
              current mental state.
            </div>
            <h3>Why?</h3>
            <div>
              In a recent study on mental health by{" "}
              <a
                href="https://www.accenture.com/_acnmedia/pdf-90/accenture-tch-its-all-of-us-research-updated-report.pdf"
                target="_blank"
              >
                Accenture
              </a>{" "}
              sixty six percent of the employees who participated in the survey
              reported having personally experienced mental health challenges.
              Eighty five percent said someone close to them had experienced a
              mental health challenge. We now better understand everyone's
              Mental Health varies on a spectrum from good to bad and it differs
              from person to person and from time to time.
            </div>
            <br></br>
            <div>
              Despite considerable progress, it’s still hard to talk about our
              mental health at work. We need more tools to help people feel safe
              about raising concerns and to not feel they need to hide how they
              are feeling.
            </div>
            <h3>Future Release</h3>
            <div>
              Coming soon! More features will be added to monitor your trends,
              share your score within a private circle-of-trust and be connected
              with a Mental Health First Aider via Direct Message or Jitsi.
            </div>
            <br></br>
            <br></br>
            <h6>
              [1] It's Not 1 in 4; It's All of Us (Barbara Harvey) |
              <a
                href="https://www.accenture.com/_acnmedia/pdf-90/accenture-tch-its-all-of-us-research-updated-report.pdf"
                target="_blank"
              >
                https://www.accenture.com/_acnmedia/pdf-90/accenture-tch-its-all-of-us-research-updated-report.pdf
              </a>
            </h6>
          </div>
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
