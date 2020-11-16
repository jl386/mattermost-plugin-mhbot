import React from "react";
import PropTypes from "prop-types";
import GoodSvg from "images/2_good.svg";

const FbGood = (props) => {
  return (
    <div className="choices">
      <img
        className="img-emotion"
        src={GoodSvg}
        alt="Good Emoticon"
        width="64"
        height="64"
      />
      <h1>
        <strong>Good</strong>
      </h1>
      <h3>This is a good place to be!</h3>
      <h3>Keep it going!</h3>
      <div className="guidance">
        <p>What is stopping you from being Excellent?</p>
        <p>
          What are the 1 or 2 things that aren't going quite as well as they
          could be?
        </p>
        <ul>
          <li>Exercise</li>
          <li>Nutrition</li>
          <li>Stress</li>
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

FbGood.propTypes = {};

export default FbGood;
