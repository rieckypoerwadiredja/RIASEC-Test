import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

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
      alert(
        `Ada pertanyaan yang belum dijawab! Pertanyaan nomor: ${unansweredQuestions.join(
          ", "
        )}`
      );
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
    <div className="flex flex-col items-center">
      <div className="space-y-4">
        {slides[currentSlide].map((question, idx) => (
          <div
            key={question.id}
            ref={question.answer === null ? unansweredQuestionRef : null}
            className={`border-dashed border-black border-2 p-1 rounded-3xl w-full md:w-[450px] mx-auto shadow-md ${
              question.answer !== null ? "bg-blue-100" : "bg-pink-200"
            }`}
          >
            <p>
              <strong>
                Soal{" "}
                {slides[currentSlide].indexOf(question) +
                  1 +
                  currentSlide * questionsPerSlide}
                :{" "}
              </strong>
              {question.question}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleAnswerChange(question.id, true)}
                className={`px-3 py-1 rounded-md ${
                  question.answer === true ? "bg-blue-300" : "bg-gray-200"
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleAnswerChange(question.id, false)}
                className={`px-3 py-1 rounded-md ${
                  question.answer === false ? "bg-blue-300" : "bg-gray-200"
                }`}
              >
                False
              </button>
            </div>
          </div>
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
            Previous
          </button>

          <button
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`px-4 py-2 rounded-md ${
              currentSlide === slides.length - 1
                ? "bg-blue-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>

        {/* Keterangan Slide */}
        <p className="text-gray-600">
          Page {currentSlide + 1} of {slides.length}
        </p>

        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-200 w-full md:max-w-[50%] mx-auto flex justify-center px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

QuestionPage.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionPage;
