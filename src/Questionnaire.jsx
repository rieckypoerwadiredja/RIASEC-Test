// src/Questionnaire.js
import React, { useState } from "react";

const questions = [
  "I like to work on cars",
  "I enjoy solving puzzles",
  "I prefer working in teams",
  "I am interested in painting",
  // Tambahkan pertanyaan lainnya di sini
];

const responses = {
  "Sangat Setuju": "R", // Realistic
  Setuju: "I", // Investigative
  Netral: "A", // Artistic
  "Tidak Setuju": "S", // Social
  "Sangat Tidak Setuju (Enterprising)": "E", // Enterprising
  "Sangat Tidak Setuju (Conventional)": "C", // Conventional
};

const Questionnaire = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill("") // Nilai default kosong
  );

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes("")) {
      // Cek jika ada jawaban kosong
      alert("Silakan jawab semua pertanyaan sebelum mengirim!");
    } else {
      onSubmit(answers);
    }
  };

  return (
    <div>
      <h1>RIASEC Test</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          {Object.keys(responses).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Questionnaire;
