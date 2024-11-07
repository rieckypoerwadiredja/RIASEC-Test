import React from "react";
import PropTypes from "prop-types";
import profile_image from "../assets/images/woman.jpg";
import {
  realistic,
  investigative,
  artistic,
  social,
  enterprising,
  conventional,
} from "../data/riasecData";
import { Link } from "react-router-dom";

function ResultPage({ points }) {
  const sortedPoints = Object.entries(points).sort(([, a], [, b]) => b - a);
  const topThree = sortedPoints.slice(0, 3);
  const rest = sortedPoints.slice(3);
  const totalPoints = Object.values(points).reduce(
    (acc, point) => acc + point,
    0
  );

  return (
    <div>
      <h1 className="text-2xl md:text-3xl mb-8 font-bold text-gray-900 text-center">
        Test Result
      </h1>

      <div className="border-black border-2 rounded-3xl overflow-hidden">
        <div className="flex gap-5 p-5">
          <img
            className="aspect-square object-cover rounded-full w-20"
            src={profile_image}
            alt="Profile"
          />
          <div className="font-semibold text-gray-800 justify-center flex flex-col">
            <p>Marcella (21 years)</p>
            <p>Creativepreneurship</p>
          </div>
        </div>
        <div className="h-[2px] w-full border-t-2 border-dashed border-black"></div>
        <h3 className="text-xl font-bold text-gray-900 text-center p-5 bg-red-100">
          {topThree.length > 0 ? (
            topThree.map(([type]) => type).join(" | ")
          ) : (
            <p className="text-red-500">No Result. Something wrong</p>
          )}
        </h3>
      </div>

      {topThree.length > 0 ? (
        topThree.map(([type, point]) => {
          const percentage = Math.round((point / totalPoints) * 100);
          let description = "";
          let majors = [];
          let relatedPathways = [];

          // Menentukan deskripsi berdasarkan tipe
          if (type === "Realistic") {
            description = realistic.description;
            majors = realistic.majors;
            relatedPathways = realistic.relatedPathways;
          } else if (type === "Investigative") {
            description = investigative.description;
            majors = investigative.majors;
            relatedPathways = investigative.relatedPathways;
          } else if (type === "Artistic") {
            description = artistic.description;
            majors = artistic.majors;
            relatedPathways = artistic.relatedPathways;
          } else if (type === "Social") {
            description = social.description;
            majors = social.majors;
            relatedPathways = social.relatedPathways;
          } else if (type === "Enterprising") {
            description = enterprising.description;
            majors = enterprising.majors;
            relatedPathways = enterprising.relatedPathways;
          } else if (type === "Conventional") {
            description = conventional.description;
            majors = conventional.majors;
            relatedPathways = conventional.relatedPathways;
          }

          return (
            <div
              key={type}
              className="border-black border-2 rounded-3xl overflow-hidden my-4"
            >
              <div className="flex gap-5 p-5 items-center">
                {/* Persentase di Tengah */}
                <p className="text-3xl font-bold text-gray-900 text-center">
                  {percentage}%
                </p>
                <div className="text-gray-800">
                  <p className="font-bold text-lg">{type}</p>
                  <p>{description}</p>
                  <Link className="underline" to={`/learn-more/${type}`}>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-red-500">No Result. Something wrong</p>
      )}

      <h2 className="text-2xl md:text-3xl mb-8 font-bold text-gray-900 text-center">
        Another Result
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-auto gap-4 justify-center">
        {rest.length > 0 ? (
          rest.map(([type, point]) => {
            const percentage = Math.round((point / totalPoints) * 100);
            let description = "";

            // Menentukan deskripsi berdasarkan tipe
            if (type === "Realistic") {
              description = realistic.description;
            } else if (type === "Investigative") {
              description = investigative.description;
            } else if (type === "Artistic") {
              description = artistic.description;
            } else if (type === "Social") {
              description = social.description;
            } else if (type === "Enterprising") {
              description = enterprising.description;
            } else if (type === "Conventional") {
              description = conventional.description;
            }

            return (
              <div
                key={type}
                className="border-black border-2 rounded-3xl overflow-hidden w-full"
              >
                <div className="flex flex-col p-5 items-center">
                  {/* Persentase di Tengah */}
                  <p className="text-3xl font-bold text-gray-900 text-center">
                    {percentage}%
                  </p>
                  <p className="font-bold text-lg">{type}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-red-500">No Result. Something wrong</p>
        )}
      </div>
    </div>
  );
}

ResultPage.propTypes = {
  points: PropTypes.object.isRequired,
};

export default ResultPage;
