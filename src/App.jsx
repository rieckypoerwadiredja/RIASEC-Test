import { useState } from "react";
import QuestionPage from "./component/QuestionPage";
import ResultPage from "./component/ResultPage";

function App() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "Realistic",
      question: "I like to work on cars (Realistic)",
      answer: null,
    },
    {
      id: 2,
      type: "Investigative",
      question: "I like to do puzzles (Investigative)",
      answer: null,
    },
    {
      id: 3,
      type: "Independent",
      question: "I am good at working independently (Independent)",
      answer: null,
    },
    {
      id: 4,
      type: "Realistic",
      question: "I like to build things (Realistic)",
      answer: null,
    },
    {
      id: 5,
      type: "Artistic",
      question: "I like to read about art and music (Artistic)",
      answer: null,
    },
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [points, setPoints] = useState({});

  const handleSubmit = () => {
    // Menghitung jumlah poin berdasarkan jawaban yang 'Yes'
    const calculatedPoints = questions.reduce((acc, question) => {
      if (question.answer === true) {
        acc[question.type] = (acc[question.type] || 0) + 1;
      }
      return acc;
    }, {});

    setPoints(calculatedPoints);
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <ResultPage points={points} />
      ) : (
        <>
          <QuestionPage questions={questions} setQuestions={setQuestions} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default App;
