import React from "react";
import PropTypes from "prop-types";

function QuestionPage({ questions, setQuestions }) {
  const handleAnswerChange = (id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer } : question
      )
    );
  };

  return (
    <form>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-900 text-center">
        Career Pathway Finder
      </h2>
      <p class="mt-1 text-sm/6 text-gray-600 text-center">
        Discover your ideal career fit through personalized interests and
        skills.
      </p>
      {questions.map((question, idx) => (
        <fieldset key={question.id} className="w-full my-10">
          <legend className="text-lg font-semibold text-gray-900 text-center">
            {idx + 1}. {question.question}
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
      ))}
    </form>
  );
}

QuestionPage.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionPage;
