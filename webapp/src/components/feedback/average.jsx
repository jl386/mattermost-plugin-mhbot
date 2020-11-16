import React from "react";
import PropTypes from "prop-types";
import AverageSvg from "images/3_average.svg";

const FbAverage = (props) => {
  return (
    <div className="choices">
      <img
        className="img-emotion"
        src={AverageSvg}
        alt="Average Emoticon"
        width="64"
        height="64"
      />
      <h1>
        <strong>Average</strong>
      </h1>
      <h3>Okay, Fine, Alright... #Standard</h3>
      <h3>This is normal, don't panic!</h3>
      <div className="guidance">
        <p>
          We all experience this a lot of the time. Time to take a step back and
          ask yourself what's missing? Why do I feel this way today?
        </p>
        <p>What's driving a lower form? This is a good time to reflect.</p>
        <ul>
          <li>
            How well have I <strong>slept</strong> lately?
          </li>
          <li>
            How connected am I to <strong>friends</strong> and{" "}
            <strong>family</strong>?
          </li>
          <li>
            How well am I balancing <strong>stress</strong> with{" "}
            <strong>recovery</strong>?
          </li>
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

FbAverage.propTypes = {};

export default FbAverage;
