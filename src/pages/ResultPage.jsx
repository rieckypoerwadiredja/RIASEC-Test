import React, { useState } from "react";
import {
  realistic,
  investigative,
  artistic,
  social,
  enterprising,
  conventional,
} from "../data/riasecData";
import img_inno from "../assets/images/full_innovative.jpg";
import Footer from "../component/Footer";

function VideoLinkForm({ onSubmit }) {
  const [videoLink, setVideoLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (videoLink.trim()) {
      // TODO Validasi apakah link berasal dari Google Drive atau YouTube
      // const driveRegex =
      //   /https:\/\/drive.google.com\/(file\/d\/[\w-]+|drive\/folders\/[\w-]+)/;
      // const youtubeRegex =
      //   /https:\/\/(www\.)?youtube\.com\/(watch\?v=|embed\/)[\w-]+/;

      // if (!driveRegex.test(videoLink) && !youtubeRegex.test(videoLink)) {
      //   alert(
      //     "Link yang dimasukkan harus berasal dari Google Drive atau YouTube."
      //   );
      //   return;
      // }

      // TODO Konfirmasi link
      const isConfirmed = window.confirm(
        "Pastikan link Google Drive yang dimasukkan sudah diatur sebagai publik agar dapat diakses tanpa login."
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
    <div className="p-5 border-black border-2 rounded-3xl min-h-[80vh] my-4">
      <h2 className="text-xl font-bold text-center mb-4">Input Video Link</h2>
      <div className="p-2 bg-blue-200 rounded-lg shadow-md flex flex-col items-start">
        <p className="text-gray-700 mb-2 text-center">
          Note: Link harus public, durasi maksimal 5 menit, dengan 3 pertanyaan.
        </p>
        <p className="text-gray-700 mb-2 text-center">
          1. Perkenalkan diri dan sebutkan hal menarik tentang dirimu
        </p>
        <p className="text-gray-700 mb-2 text-center">
          2. Jurusan apa yang Anda minati?
        </p>
        <p className="text-gray-700 mb-2 text-center">
          3. Apa yang membuat Anda tertarik untuk memilih Binus sebagai kampus
          anda?
        </p>
      </div>
      <p className="text-gray-700 mb-2 text-center">3.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
          className="px-5 mx-auto sm:px-20 font-medium uppercase py-2 bg-third mt-5 text-white rounded-3xl shadow-sm hover:bg-third/80"
        >
          Submit Link Video
        </button>
      </form>
    </div>
  );
}

function ResultPage() {
  // Ambil data 'formData' dari localStorage
  const formData = JSON.parse(localStorage.getItem("formData"));
  const [videoLink, setVideoLink] = useState(formData?.videoLink || ""); // Ambil videoLink dari formData jika ada
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const results = formData?.result || []; // Jika results tidak ada, beri array kosong
  const sortedResults = results.sort((a, b) => b.points - a.points);
  const topThree = sortedResults.slice(0, 3); // Top 3 berdasarkan points
  const rest = sortedResults.slice(3); // Sisanya
  const totalPoints = results.reduce((acc, { points }) => acc + points, 0);

  const handleOnSubmitTest = async (e) => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbz1OTOSqIKA6ivyuEjhG8g1DZSqY0BKI141Q1qCoXAmN8f2orN7lml-QyRgTc78XpE9LQ/exec";
    const form = document.forms["career-pathway-finder"];

    // Cek apakah videoLink sudah diisi
    if (!videoLink) {
      alert("Lengkapi link perkenalan dirimu!");
      return;
    }

    // Cek data formData untuk field yang kosong
    if (
      !formData.name ||
      !formData.dob ||
      !formData.jurusan ||
      !formData.noFormulir ||
      !formData.email
    ) {
      alert("Lengkapi semua data sebelum submit.");
      return;
    }

    e.preventDefault();

    try {
      setIsLoadingSubmit(true);

      // Simpan videoLink ke localStorage sebelum submit
      const updatedFormData = { ...formData, videoLink };
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      // Tambahkan videoLink ke FormData
      const formDataToSend = new FormData(form);
      formDataToSend.append("videoLink", videoLink);

      await fetch(scriptURL, {
        method: "POST",
        body: formDataToSend,
      });

      alert("Selesai! Hasil akan dikirim ke email Anda. \n Terima kasih.");
      setIsLoadingSubmit(false);
      localStorage.removeItem("formData");
      window.location.reload();
    } catch (error) {
      console.error("Error!", error.message);
    }
  };

  return (
    <>
      <div className="mt-5 relative px-5">
        <img
          className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10"
          src={img_inno}
          alt=""
        />
        <h1 className="text-2xl md:text-3xl mb-8 font-bold text-gray-900 text-center">
          Hasil Career Pathway Kamu
        </h1>

        {!formData?.videoLink ? (
          <VideoLinkForm onSubmit={() => window.location.reload()} />
        ) : (
          <div>
            <div className="border-black border-2 rounded-3xl overflow-hidden">
              <div className="flex gap-5 p-5 w-full">
                <div className="font-semibold text-gray-800 justify-center items-center flex flex-col w-full">
                  <form
                    className="space-y-4 w-full px-5 bg-gree-500 flex flex-col justify-center items-center"
                    name="career-pathway-finder"
                  >
                    <div className="max-w-[400px] w-full flex flex-col gap-y-2">
                      <label className="flex items-start justify-center flex-col">
                        <span className="block text-gray-700 text-lg font-bold mb-2 ml-2">
                          Nama
                        </span>
                        <input
                          name="nama"
                          type="text"
                          value={formData?.name || "[User's Name]"}
                          readOnly
                          className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </label>
                      <label className="flex items-start justify-center flex-col">
                        <span className="block text-gray-700 text-lg font-bold mb-2 ml-2">
                          Tanggal Lahir
                        </span>
                        <input
                          name="tgl_lahir"
                          type="text"
                          value={formData?.dob || "[User's Date of Birth]"}
                          readOnly
                          className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </label>
                      <label className="flex items-start justify-center flex-col">
                        <span className="block text-gray-700 text-lg font-bold mb-2 ml-2">
                          Jurusan
                        </span>
                        <input
                          name="jurusan"
                          type="text"
                          value={formData?.jurusan || "[User's Jurusan]"}
                          readOnly
                          className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </label>
                      <label className="flex items-start justify-center flex-col">
                        <span className="block text-gray-700 text-lg font-bold mb-2 ml-2">
                          No Formulir
                        </span>
                        <input
                          name="no_formulir"
                          type="text"
                          value={
                            formData?.noFormulir || "[User's Formulir Number]"
                          }
                          readOnly
                          className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </label>
                      <label className="flex items-start justify-center flex-col">
                        <span className="block text-gray-700 text-lg font-bold mb-2 ml-2">
                          Email
                        </span>
                        <input
                          name="email"
                          type="text"
                          value={formData?.email || "[User's Email]"}
                          readOnly
                          className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </label>
                      <label className="flex items-start justify-center flex-col">
                        <span className="block text-gray-700 text-lg font-bold mb-2 ml-2">
                          Video Link
                        </span>
                        <input
                          name="link_video"
                          type="text"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                          className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </label>
                      {formData.result.map((result) => (
                        <label className=" items-center justify-center hidden">
                          <input
                            name={result.type}
                            type="hidden"
                            value={result.points || "[Result]"}
                            readOnly
                            className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </label>
                      ))}

                      {topThree.map((result, idx) => (
                        <React.Fragment key={idx}>
                          <label className="items-center justify-center hidden">
                            <input
                              name={`Result_${idx + 1}`}
                              type="hidden"
                              value={result.type || "[Result]"}
                              readOnly
                              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </label>
                          <label className="items-center justify-center hidden">
                            <input
                              name={`Percent_Result_${idx + 1}`}
                              type="hidden"
                              value={`${Math.round(
                                (result.points / totalPoints) * 100
                              )}%`}
                              readOnly
                              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </label>
                          <label className="items-center justify-center hidden">
                            <input
                              name={`Desc_Result_${idx + 1}`}
                              type="hidden"
                              value={
                                result.type === "Realistic"
                                  ? realistic.description
                                  : result.type === "Investigative"
                                  ? investigative.description
                                  : result.type === "Artistic"
                                  ? artistic.description
                                  : result.type === "Social"
                                  ? social.description
                                  : result.type === "Enterprising"
                                  ? enterprising.description
                                  : result.type === "Conventional"
                                  ? conventional.description
                                  : "[Description]"
                              }
                              readOnly
                              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </label>
                          <label className="items-center justify-center hidden">
                            <input
                              name={`Major_Result_${idx + 1}`}
                              type="hidden"
                              value={
                                result.type === "Realistic"
                                  ? realistic.majors.join(", ")
                                  : result.type === "Investigative"
                                  ? investigative.majors.join(", ")
                                  : result.type === "Artistic"
                                  ? artistic.majors.join(", ")
                                  : result.type === "Social"
                                  ? social.majors.join(", ")
                                  : result.type === "Enterprising"
                                  ? enterprising.majors.join(", ")
                                  : result.type === "Conventional"
                                  ? conventional.majors.join(", ")
                                  : "[Majors]"
                              }
                              readOnly
                              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </label>
                          <label className="items-center justify-center hidden">
                            <input
                              name={`RelatedPathways_Result_${idx + 1}`}
                              type="hidden"
                              value={
                                result.type === "Realistic"
                                  ? realistic.relatedPathways.join(", ")
                                  : result.type === "Investigative"
                                  ? investigative.relatedPathways.join(", ")
                                  : result.type === "Artistic"
                                  ? artistic.relatedPathways.join(", ")
                                  : result.type === "Social"
                                  ? social.relatedPathways.join(", ")
                                  : result.type === "Enterprising"
                                  ? enterprising.relatedPathways.join(", ")
                                  : result.type === "Conventional"
                                  ? conventional.relatedPathways.join(", ")
                                  : "[Related Pathways]"
                              }
                              readOnly
                              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </label>
                        </React.Fragment>
                      ))}

                      {/* Tombol Submit Hasil Ujian */}
                      <button
                        type="submit"
                        disabled={isLoadingSubmit}
                        onClick={(e) => handleOnSubmitTest(e)}
                        className="px-5 font-medium uppercase py-2 bg-third mt-5 text-white rounded-3xl shadow-sm hover:bg-third/80"
                      >
                        {isLoadingSubmit ? "Loading..." : "Submit Your Result"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="h-[2px] w-full border-t-2 border-dashed border-black"></div>
              <h3 className="text-xl font-bold text-gray-900 text-center p-5 bg-secondary">
                {topThree.length > 0 ? (
                  topThree.map(({ type }) => type).join(" | ")
                ) : (
                  <p className="text-red-500">
                    Tidak ada hasil. Terjadi kesalahan.
                  </p>
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
                    className="border-black bg-white/70 border-2 rounded-3xl overflow-hidden my-4"
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
              <p className="text-red-500">
                Tidak ada hasil. Terjadi kesalahan.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer isWave={false} />
    </>
  );
}

export default ResultPage;
