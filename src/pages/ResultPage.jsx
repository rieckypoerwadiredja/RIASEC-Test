import React, { useState } from "react";
import profile_image from "../assets/images/woman.jpg";
import {
  realistic,
  investigative,
  artistic,
  social,
  enterprising,
  conventional,
} from "../data/riasecData";

function VideoLinkForm({ onSubmit }) {
  const [videoLink, setVideoLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoLink.trim()) {
      // Konfirmasi link
      const isConfirmed = window.confirm(
        "Apakah Anda yakin link yang dimasukkan sudah benar?"
      );
      if (isConfirmed) {
        // Ambil data formData yang sudah ada di localStorage
        const formData = JSON.parse(localStorage.getItem("formData")) || {};
        // Tambahkan videoLink ke formData
        formData.videoLink = videoLink;
        // Simpan kembali formData ke localStorage
        localStorage.setItem("formData", JSON.stringify(formData));
        onSubmit(); // Callback untuk memberi tahu form telah disubmit
      }
    }
  };

  return (
    <div className="p-5 border-black border-2 rounded-3xl my-4">
      <h2 className="text-xl font-bold text-center mb-4">Input Video Link</h2>
      <p className="text-gray-700 mb-2 text-center">
        Note: Link harus public, durasi maksimal 5 menit, dengan 3 pertanyaan.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter video link"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function ResultPage() {
  // Ambil data 'formData' dari localStorage
  const formData = JSON.parse(localStorage.getItem("formData"));
  const hasVideoLink = formData?.videoLink; // Cek apakah videoLink sudah ada di formData

  const results = formData?.result || []; // Jika results tidak ada, beri array kosong
  const sortedResults = results.sort((a, b) => b.points - a.points);
  const topThree = sortedResults.slice(0, 3); // Top 3 berdasarkan points
  const rest = sortedResults.slice(3); // Sisanya
  const totalPoints = results.reduce((acc, { points }) => acc + points, 0);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl mb-8 font-bold text-gray-900 text-center">
        Test Result
      </h1>

      {!hasVideoLink ? (
        <VideoLinkForm onSubmit={() => window.location.reload()} />
      ) : (
        <div>
          <div className="border-black border-2 rounded-3xl overflow-hidden">
            <div className="flex gap-5 p-5">
              <img
                className="aspect-square object-cover rounded-full w-20"
                src={profile_image}
                alt="Profile"
              />
              <div className="font-semibold text-gray-800 justify-center flex flex-col w-full max-w-[400px]">
                <form className="space-y-4 w-full">
                  <label className="flex items-center justify-center">
                    <span className="text-gray-700 w-1/3">Name</span>
                    <input
                      type="text"
                      value={formData?.name || "[User's Name]"}
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex items-center justify-center">
                    <span className="text-gray-700 w-1/3">Date of Birth</span>
                    <input
                      type="text"
                      value={formData?.dob || "[User's Date of Birth]"}
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex items-center justify-center">
                    <span className="text-gray-700 w-1/3">Jurusan</span>
                    <input
                      type="text"
                      value={formData?.jurusan || "[User's Jurusan]"}
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex items-center justify-center">
                    <span className="text-gray-700 w-1/3">No Formulir</span>
                    <input
                      type="text"
                      value={formData?.noFormulir || "[User's Formulir Number]"}
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex items-center justify-center">
                    <span className="text-gray-700 w-1/3">Email</span>
                    <input
                      type="text"
                      value={formData?.email || "[User's Email]"}
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex items-center justify-center">
                    <span className="text-gray-700 w-1/3">Video Link</span>
                    <input
                      type="text"
                      value={formData?.videoLink || "[Video Link]"}
                      readOnly
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                    />
                  </label>

                  {/* Tombol Submit Hasil Ujian */}
                  <button
                    type="button"
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Submit Hasil Ujian
                  </button>
                </form>
              </div>
            </div>
            <div className="h-[2px] w-full border-t-2 border-dashed border-black"></div>
            <h3 className="text-xl font-bold text-gray-900 text-center p-5 bg-red-100">
              {topThree.length > 0 ? (
                topThree.map(({ type }) => type).join(" | ")
              ) : (
                <p className="text-red-500">No Result. Something wrong</p>
              )}
            </h3>
          </div>

          {topThree.length > 0 ? (
            topThree.map(({ type, points }) => {
              const percentage = Math.round((points / totalPoints) * 100);
              let description = "";
              let majors = [];
              let relatedPathways = [];

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
                    <p className="text-3xl font-bold text-gray-900 text-center">
                      {percentage}%
                    </p>
                    <div className="text-gray-800">
                      <p className="font-bold text-lg">{type}</p>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-red-500">No Result. Something wrong</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultPage;
