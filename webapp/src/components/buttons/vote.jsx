import React from "react";
import PropTypes from "prop-types";

// Emoticon SVGs
// Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import ExcellentSvg from "images/1_excellent.svg";
import GoodSvg from "images/2_good.svg";
import AverageSvg from "images/3_average.svg";
import PoorSvg from "images/4_poor.svg";
import TerribleSvg from "images/5_very_poor.svg";

const VoteButton = (props) => {
  let emotion;
  let emotion_description;

  switch (parseInt(props.score)) {
    case 1:
      emotion = (
        <img
          className=""
          src={ExcellentSvg}
          alt="Excellent Emoticon"
          width="32"
          height="32"
          data-vote="1"
        />
      );
      emotion_description = "Excellent";
      break;
    case 2:
      emotion = (
        <img
          className=""
          src={GoodSvg}
          alt="Good Emoticon"
          width="32"
          height="32"
          data-vote="2"
        />
      );
      emotion_description = "Good";
      break;
    case 3:
      emotion = (
        <img
          className=""
          src={AverageSvg}
          alt="Average Emoticon"
          width="32"
          height="32"
          data-vote="3"
        />
      );
      emotion_description = "Average";
      break;
    case 4:
      emotion = (
        <img
          className=""
          src={PoorSvg}
          alt="Poor Emoticon"
          width="32"
          height="32"
          data-vote="4"
        />
      );
      emotion_description = "Poor";
      break;
    case 5:
      emotion = (
        <img
          className=""
          src={TerribleSvg}
          alt="Terrible Emoticon"
          width="32"
          height="32"
          data-vote="5"
        />
      );
      emotion_description = "Terrible";
      break;
  }

  return (
    <div onClick={props.update} data-vote={props.score}>
      <button
        id={"btn-vote-" + props.score}
        active
        data-vote={props.score}
        className={
          props.active == props.score
            ? "vote-button vote-button__selected"
            : "vote-button"
        }
        type="button"
      >
        <div data-vote={props.score}>
          {emotion}
          <span data-vote={props.score} className={"vote-" + props.score}>
            {emotion_description}
          </span>
        </div>
      </button>
    </div>
  );
};

VoteButton.propTypes = {
  score: PropTypes.string.isRequired,
};

export default VoteButton;
