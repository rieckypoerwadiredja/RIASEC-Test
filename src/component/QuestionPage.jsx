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
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="yes"
              onChange={() => handleAnswerChange(question.id, true)}
              checked={question.answer === true}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="no"
              onChange={() => handleAnswerChange(question.id, false)}
              checked={question.answer === false}
            />
            No
          </label>
        </div>
      ))}
    </form>
  );
}

QuestionPage.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionPage;
