import React from "react";
import PropTypes from "prop-types";

function ResultPage({ points }) {
  // Mengonversi objek points menjadi array, mengurutkan berdasarkan nilai, dan mengambil tiga teratas
  const sortedPoints = Object.entries(points).sort(([, a], [, b]) => b - a); // Mengurutkan dari yang tertinggi

  const topThree = sortedPoints.slice(0, 3); // Tiga teratas
  const remaining = sortedPoints.slice(3); // Sisanya

  return (
    <div>
      <h2>Hasil Top 3</h2>
      {topThree.length > 0 ? (
        topThree.map(([type, point]) => (
          <p key={type}>
            {type}: {point} poin
          </p>
        ))
      ) : (
        <p>Tidak ada hasil yang tersedia.</p>
      )}

      <h2>Hasil Lainnya</h2>
      {remaining.length > 0 ? (
        remaining.map(([type, point]) => (
          <p key={type}>
            {type}: {point} poin
          </p>
        ))
      ) : (
        <p>Tidak ada hasil lainnya.</p>
      )}
    </div>
  );
}

ResultPage.propTypes = {
  points: PropTypes.object.isRequired,
};

export default ResultPage;
