import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Footer from "../component/Footer";

function QuestionPage({ questions, setQuestions, handleSubmit }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const questionsPerSlide = 10;
  const unansweredQuestionRef = useRef(null);

  // Mengelompokkan soal per slide
  const slides = [];
  for (let i = 0; i < questions.length; i += questionsPerSlide) {
    slides.push(questions.slice(i, i + questionsPerSlide));
  }

  const handleAnswerChange = (id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer } : question
      )
    );
  };

  const goToNextSlide = () => {
    // Mengambil nomor pertanyaan yang belum dijawab dari seluruh soal
    const unansweredQuestions = slides[currentSlide]
      .map((question, index) =>
        question.answer === null
          ? index + 1 + currentSlide * questionsPerSlide
          : null
      )
      .filter((index) => index !== null); // Ambil nomor pertanyaan yang belum dijawab

    if (unansweredQuestions.length > 0) {
      alert(`Pastikan nomor pertanyaan: ${unansweredQuestions.join(", ")}`);
      unansweredQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setCurrentSlide((prevSlide) =>
        Math.min(prevSlide + 1, slides.length - 1)
      );
    }
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  // Scroll to top when currentSlide changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSlide]);

  return (
    <>
      <div className="flex flex-col items-center mt-5">
        <div className="space-y-4 flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-3xl font-semibold mx-auto">
            Career Pathways Test
          </h2>
          <p className="mb-10 text-center">
            Pertanyaan ini tidak memiliki jawaban benar atau salah; silakan
            pilih sesuai dengan minat Anda.
          </p>
          {slides[currentSlide].map((question, idx) => (
            <>
              <div className="flex items-center gap-x-3 px-3 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full aspect-square bg-primary text-white font-bold">
                  {slides[currentSlide].indexOf(question) +
                    1 +
                    currentSlide * questionsPerSlide}
                  .{" "}
                </div>
                <div
                  key={question.id}
                  ref={question.answer === null ? unansweredQuestionRef : null}
                  className={`border-primary border-2 flex justify-between items-center p-3 rounded-3xl w-full md:w-[450px] mx-auto shadow-md ${
                    question.answer !== null ? "bg-secondary" : "bg-pink-200"
                  }`}
                >
                  <p>
                    <strong>
                      {/* {slides[currentSlide].indexOf(question) +
                      1 +
                      currentSlide * questionsPerSlide}
                    .{" "} */}
                    </strong>
                    {question.question}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAnswerChange(question.id, true)}
                      className={`px-3 py-1 rounded-md ${
                        question.answer === true
                          ? "bg-primary text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      onClick={() => handleAnswerChange(question.id, false)}
                      className={`px-3 py-1 rounded-md ${
                        question.answer === false
                          ? "bg-primary text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <button
              onClick={goToPreviousSlide}
              disabled={currentSlide === 0}
              className={`px-4 py-2 rounded-md ${
                currentSlide === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
            >
              Sebelumnya
            </button>

            <button
              onClick={goToNextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`px-4 py-2 rounded-md ${
                currentSlide === slides.length - 1
                  ? "bg-secondary text-black cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/80"
              }`}
            >
              Selanjutnya
            </button>
          </div>

          {/* Keterangan Slide */}
          <p className="text-gray-600">
            Halaman {currentSlide + 1} of {slides.length}
          </p>

          {currentSlide === slides.length - 1 && (
            <button
              onClick={handleSubmit}
              className="px-5 sm:px-20 font-medium uppercase py-2 bg-third mt-5 text-white rounded-3xl shadow-sm hover:bg-third/80"
            >
              Kirim Jawaban
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

QuestionPage.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionPage;
