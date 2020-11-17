import React from "react";
import PropTypes from "prop-types";

const ShareButton = (props) => {
  return (
    <div className="share-button">
      <button
        className="btn-share"
        onClick={() => props.share(props.score, props.notes)}
      >
        <span>Share!</span>
      </button>
    </div>
  );
};

ShareButton.propTypes = {
  score: PropTypes.string.isRequired,
  notes: PropTypes.string,
  share: PropTypes.func.isRequired,
};

export default ShareButton;
