import React from "react";
import PropTypes from "prop-types";
import TerribleSvg from "images/5_terrible.svg";

const FbTerrible = (props) => {
  return (
    <div className="choices">
      <img
        className="img-emotion"
        src={TerribleSvg}
        alt="Terrible Emoticon"
        width="64"
        height="64"
      />
      <h1>
        <strong>Terrible</strong>
      </h1>
      <h3>It's okay to seek help</h3>
      <div className="guidance">
        <p>
          Know that it is okay to reach out about a Mental Health challenge, you
          are not alone. Remember that feelings are temporary but a strong
          warning sign to do something about it.
        </p>
        <p>Please tap into the resources you have around you:</p>
        <ul>
          <li>Book an appointment with your GP/Doctor</li>
          <li>Employee Assistance Programme</li>
          <li>
            <a href="#">National Crisis Help Lines</a>
          </li>
        </ul>
        <br />
        <p>It will feel hard but know that you can come through this.</p>
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

FbTerrible.propTypes = {};

export default FbTerrible;
