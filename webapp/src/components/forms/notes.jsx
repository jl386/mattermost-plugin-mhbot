import React from "react";
import PropTypes from "prop-types";

const NoteArea = (props) => {
  return (
    <div className="notes">
      <label>Notes:</label>
      <div>
        <textarea placeholder="Why do you feel this way?" rows="3"></textarea>
      </div>
    </div>
  );
};

NoteArea.propTypes = {};

export default NoteArea;
