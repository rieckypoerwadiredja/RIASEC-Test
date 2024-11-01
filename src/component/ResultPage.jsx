import React from "react";
import PropTypes from "prop-types";

function ResultPage({ points }) {
  // Mengurutkan point dari tertinggi
  const sortedPoints = Object.entries(points).sort(([, a], [, b]) => b - a);

  const topThree = sortedPoints.slice(0, 3); // mengambil nilai top Tiga teratas
  const remaining = sortedPoints.slice(3); // Sisanya dampilkan di layer bawah

  return (
    <div>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-900 text-center">
        Your Dominant Result
      </h2>
      {topThree.length > 0 ? (
        topThree.map(([type, point]) => (
          <div>
            {type}: {point} poin
          </div>
        ))
      ) : (
        <p className="text-red-500">No Result. Something wrong</p>
      )}

      <div></div>

      <h2>Hasil Lainnya</h2>
      {remaining.length > 0 ? (
        remaining.map(([type, point]) => (
          <p key={type}>
            {type}: {point} poin
          </p>
        ))
      ) : (
        <p className="text-red-500">No Result. Something wrong</p>
      )}
    </div>
  );
}

ResultPage.propTypes = {
  points: PropTypes.object.isRequired,
};

export default ResultPage;
