import React from "react";
import PropTypes from "prop-types";
import ExcellentSvg from "images/1_excellent.svg";

const FbExcellent = (props) => {
  return (
    <div className="choices">
      <img
        className="img-emotion"
        src={ExcellentSvg}
        alt="Excellent Emoticon"
        width="64"
        height="64"
      />
      <h1>
        <strong>Excellent</strong>
      </h1>
      <h3>Congratulations</h3>
      <h3>This is incredibly awesome!</h3>
      <div className="guidance">
        <p>
          Everything is in-sync, you have bags of energy and are ready to
          rock'n'roll. Not everything has to be perfect, lets ride this high.
        </p>
        <p>
          Now what can we do to help someone else? Lets use that energy! Lets
          change the world.
        </p>
        <ul>
          <li>Reconnect with a friend</li>
          <li>Buy someone a coffee</li>
          <li>Recognise a team mate</li>
        </ul>
        <br />
        <h5>
          <strong>Need Help?</strong>
        </h5>
        <p>
          Visit our company's intranet site for further information about
          managing your emotional wellbeing.
        </p>
      </div>
    </div>
  );
};

FbExcellent.propTypes = {};

export default FbExcellent;
