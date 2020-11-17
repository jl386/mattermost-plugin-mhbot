// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from "react";
import PropTypes from "prop-types";
import Scrollbars from "react-custom-scrollbars";

import ShareButton from "../buttons/share";
import VoteButton from "../buttons/vote";

import "./sidebar_right.scss";
import NoteArea from "components/forms/notes";

import ExcellentSvg from "images/1_excellent.svg";
import GoodSvg from "images/2_good.svg";
import AverageSvg from "images/3_average.svg";
import PoorSvg from "images/4_poor.svg";
import TerribleSvg from "images/5_terrible.svg";
import { throws } from "assert";
import { runInThisContext } from "vm";

import FbExcellent from "../feedback/excellent";
import FbGood from "../feedback/good";
import FbAverage from "../feedback/average";
import FbPoor from "../feedback/poor";
import FbTerrible from "../feedback/terrible";

import { filterProfiles } from "mattermost-redux/selectors/entities/users";
import ScoreToText from "components/feedback/score_to_text";

export function renderView(props) {
  return <div {...props} className="scrollbar--view" />;
}

export function renderThumbHorizontal(props) {
  return <div {...props} className="scrollbar--horizontal" />;
}

export function renderThumbVertical(props) {
  return <div {...props} className="scrollbar--vertical" />;
}

export default class SidebarRight extends React.PureComponent {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    lastRating: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    siteURL: PropTypes.string.isRequired,
    rhsState: PropTypes.string,
    actions: PropTypes.shape({
      getLast: PropTypes.func.isRequired,
      vote: PropTypes.func.isRequired,
      share: PropTypes.func.isRequired,
      openRootModal: PropTypes.func.isRequired,
      setVisible: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showInbox: true,
      showMy: true,
    };
  }

  handleNote = (e) => {
    this.setState({ notes: e.target.value });
  };

  getLastRating() {
    return this.props.getLastRating;
  }

  updateScore = (e) => {
    this.setState({
      score: e.target.getAttribute("data-vote"),
      active: e.target.getAttribute("data-vote"),
    });
  };

  newUpdateScore(score) {
    this.setState({ active: score });
  }

  componentDidMount() {
    this.props.actions.getLast();
    this.props.actions.setVisible(true);
  }

  componentWillUnmount() {
    this.props.actions.setVisible(false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rhsState !== this.props.rhsState) {
      this.openList(this.props.rhsState);
    }
  }

  shareRating() {
    return (
      <React.Fragment>
        <Scrollbars
          autoHide={true}
          autoHideTimeout={500}
          autoHideDuration={500}
          renderThumbHorizontal={renderThumbHorizontal}
          renderThumbVertical={renderThumbVertical}
          renderView={renderView}
          className="SidebarRight"
        >
          <div>
            <div
              className="dhelp"
              onClick={() => {
                this.props.actions.openRootModal("");
              }}
            >
              <i className="fa fa-info-circle" /> Help
            </div>
            {this.props.lastRating.score && (
              <div className="label-yesterday-rating">
                Previous Rating:{" "}
                <ScoreToText score={this.props.lastRating.score}></ScoreToText>
              </div>
            )}
          </div>
          <br></br>
          <div>
            <div className="welcome-user">
              Hi {this.props.currentUser.first_name},
            </div>
            <div className="welcome-message">
              How is your emotional health today?
            </div>
          </div>
          <br></br>
          <div className="choices">
            <div>
              <button
                id={"btn-vote-1"}
                className={
                  this.state.score == 1
                    ? "vote-button vote-button__selected"
                    : "vote-button"
                }
                type="button"
                onClick={() => {
                  this.setState({ score: "1" });
                }}
              >
                <div>
                  <img
                    className=""
                    src={ExcellentSvg}
                    alt="Excellent Emoticon"
                    width="32"
                    height="32"
                  />
                  <span className={"vote-1"}>Excellent</span>
                </div>
              </button>
            </div>
            <div>
              <button
                id={"btn-vote-2"}
                className={
                  this.state.score == 2
                    ? "vote-button vote-button__selected"
                    : "vote-button"
                }
                type="button"
                onClick={() => {
                  this.setState({ score: "2" });
                }}
              >
                <div>
                  <img
                    className=""
                    src={GoodSvg}
                    alt="Good Emoticon"
                    width="32"
                    height="32"
                  />
                  <span className={"vote-2"}>Good</span>
                </div>
              </button>
            </div>
            <div>
              <button
                id={"btn-vote-3"}
                className={
                  this.state.score == 3
                    ? "vote-button vote-button__selected"
                    : "vote-button"
                }
                type="button"
                onClick={() => {
                  this.setState({ score: "3" });
                }}
              >
                <div>
                  <img
                    className=""
                    src={AverageSvg}
                    alt="Average Emoticon"
                    width="32"
                    height="32"
                  />
                  <span className={"vote-3"}>Average</span>
                </div>
              </button>
            </div>
            <div>
              <button
                id={"btn-vote-4"}
                className={
                  this.state.score == 4
                    ? "vote-button vote-button__selected"
                    : "vote-button"
                }
                type="button"
                onClick={() => {
                  this.setState({ score: "4" });
                }}
              >
                <div>
                  <img
                    className=""
                    src={PoorSvg}
                    alt="Poor Emoticon"
                    width="32"
                    height="32"
                  />
                  <span className={"vote-4"}>Poor</span>
                </div>
              </button>
            </div>
            <div>
              <button
                id={"btn-vote-5"}
                className={
                  this.state.score == 5
                    ? "vote-button vote-button__selected"
                    : "vote-button"
                }
                type="button"
                onClick={() => {
                  this.setState({ score: "5" });
                }}
              >
                <div>
                  <img
                    className=""
                    src={TerribleSvg}
                    alt="Terrible Emoticon"
                    width="32"
                    height="32"
                  />
                  <span className={"vote-5"}>Terrible</span>
                </div>
              </button>
            </div>
          </div>
          <div className="notes">
            <label>Notes:</label>
            <div>
              <textarea
                id="notes"
                onChange={this.handleNote}
                placeholder="Why do you feel this way?"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="share-button">
            <ShareButton
              share={this.props.actions.share}
              score={this.state.score}
              notes={this.state.notes}
            ></ShareButton>
          </div>
        </Scrollbars>
      </React.Fragment>
    );
  }

  getFeedback(score) {
    switch (score) {
      case 1:
        return <FbExcellent />;
      case 2:
        return <FbGood />;
      case 3:
        return <FbAverage />;
      case 4:
        return <FbPoor />;
      case 5:
        return <FbTerrible />;
    }
  }

  todaysRating() {
    return (
      <React.Fragment>
        <Scrollbars
          autoHide={true}
          autoHideTimeout={500}
          autoHideDuration={500}
          renderThumbHorizontal={renderThumbHorizontal}
          renderThumbVertical={renderThumbVertical}
          renderView={renderView}
          className="SidebarRight"
        >
          <div>
            <div>
              <div
                className="dhelp"
                onClick={() => {
                  this.props.actions.openRootModal("");
                }}
              >
                <i className="fa fa-info-circle" /> Help
              </div>
              {this.props.lastRating.score && (
                <div className="label-yesterday-rating">
                  Previous Rating:{" "}
                  <ScoreToText
                    score={this.props.lastRating.score}
                  ></ScoreToText>
                </div>
              )}
            </div>
            <br></br>
            <div className="welcome-user">
              Today's Rating:
              {this.getFeedback(this.props.lastRating.score)}
            </div>
          </div>
        </Scrollbars>
      </React.Fragment>
    );
  }

  render() {
    let { today } = this.props.lastRating;
    if (today == true) {
      return this.todaysRating();
    } else {
      return this.shareRating();
    }
  }
}
