// src/App.js
import React, { useState } from "react";
import Questionnaire from "./Questionnaire";
import Results from "./Result";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (answers) => {
    setAnswers(answers);
    setSubmitted(true);
  };

  return (
    <div>
      {!submitted ? (
        <Questionnaire onSubmit={handleSubmit} />
      ) : (
        <Results answers={answers} />
      )}
    </div>
  );
};

export default App;
