import React from "react";
import PropTypes from "prop-types";
import PoorSvg from "images/4_poor.svg";

const FbPoor = (props) => {
  return (
    <div className="choices">
      <img
        className="img-emotion"
        src={PoorSvg}
        alt="Poor Emoticon"
        width="64"
        height="64"
      />
      <h1>
        <strong>Poor</strong>
      </h1>
      <h3>Let's turn this around together</h3>
      <div className="guidance">
        <p>
          Accept that today you are experiencing low mood. What might be driving
          that feeling? Perhaps you can tweak your lifestyle or priortise sleep.
        </p>
        <p>
          Our mood is forever changing up and down, it is always temporary. What
          resources do you have available to you that might help?
        </p>
        <ul>
          <li>Coffee with a close friend</li>
          <li>Mental Health First Aid</li>
          <li>Employee Assistance Programme</li>
        </ul>
        <br />
        <h5>
          <strong>Need Help?</strong>
        </h5>
        <p>
          Visit the company's intranet site for further information about
          managing your emotional wellbeing.
        </p>
      </div>
    </div>
  );
};

FbPoor.propTypes = {};

export default FbPoor;
