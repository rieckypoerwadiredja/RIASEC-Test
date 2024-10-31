import React from "react";
import PropTypes from "prop-types";

function ResultPage({ points }) {
  return (
    <div>
      <h2>Hasil</h2>
      {Object.entries(points).map(([type, point]) => (
        <p key={type}>
          {type}: {point} poin
        </p>
      ))}
    </div>
  );
}

ResultPage.propTypes = {
  points: PropTypes.object.isRequired,
};

export default ResultPage;
