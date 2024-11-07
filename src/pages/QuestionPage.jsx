import React, { useState } from "react";
import PropTypes from "prop-types";
import mechanic_img from "../assets/images/mechanic.jpg";

function QuestionPage({ questions, setQuestions }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const questionsPerSlide = 10;

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

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousSlide = () => {
    setCurrentSlide(currentSlide - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col gap-y-5">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center">
          Career Pathway Finder
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600 text-center">
          Discover your ideal career fit through personalized interests and
          skills.
        </p>
      </div>

      <form className="flex flex-col gap-y-5">
        {slides[currentSlide].map((question, idx) => (
          <div className="border-dashed border-black border-2 p-1 rounded-3xl w-full md:w-[450px] mx-auto shadow-md">
            <fieldset key={question.id} className="w-full my-10">
              <legend className="text-lg font-semibold text-gray-900 text-center">
                {currentSlide * questionsPerSlide + idx + 1}.{" "}
                {question.question}
              </legend>

              <div className="mt-3 flex items-center justify-center gap-x-10 w-full">
                <div
                  className="flex items-center gap-x-3 h-full bg-green-200 hover:bg-green-300 py-2 px-5 cursor-pointer rounded-md shadow-md"
                  onClick={() => handleAnswerChange(question.id, true)}
                >
                  <input
                    type="radio"
                    id={`yes-${question.id}`}
                    name={`question-${question.id}`}
                    value="yes"
                    onChange={() => handleAnswerChange(question.id, true)}
                    checked={question.answer === true}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                  />
                  <label
                    htmlFor={`yes-${question.id}`}
                    className="block text-sm/6 font-medium text-gray-900 cursor-pointer"
                  >
                    Yes
                  </label>
                </div>
                <div
                  className="flex items-center gap-x-3 h-full bg-red-200 hover:bg-red-300 py-2 px-5 cursor-pointer rounded-md shadow-md"
                  onClick={() => handleAnswerChange(question.id, false)}
                >
                  <input
                    type="radio"
                    id={`no-${question.id}`}
                    name={`question-${question.id}`}
                    value="no"
                    onChange={() => handleAnswerChange(question.id, false)}
                    checked={question.answer === false}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                  />
                  <label
                    htmlFor={`no-${question.id}`}
                    className="block text-sm/6 font-medium text-gray-900 cursor-pointer"
                  >
                    No
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        ))}
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePreviousSlide}
          disabled={currentSlide === 0}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Slide Indicator */}
      <p className="text-center mt-4">
        Slide {currentSlide + 1} of {slides.length}
      </p>
    </div>
  );
}

QuestionPage.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionPage;
