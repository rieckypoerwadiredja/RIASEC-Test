import { useState } from "react";
import QuestionPage from "./component/QuestionPage";
import ResultPage from "./component/ResultPage";
import questionsData from "./data/questionsData";

function App() {
  const [questions, setQuestions] = useState(questionsData); // todo: List Data

  const [isSubmitted, setIsSubmitted] = useState(false); // todo: Submit lalu tampilkan resultnya
  const [points, setPoints] = useState({}); // todo: menghitung jml point tiap jenisnya

  const handleSubmit = () => {
    // todo: Valdasi semua pertanyaan sudah dijawab (tidak ada nilai null)
    const allAnswered = questions.every((question) => question.answer !== null);

    if (!allAnswered) {
      alert("Please fill in all the questions");
      return;
    }

    // todo: Semua point awal di set 0
    const initialPoints = questions.reduce((acc, question) => {
      acc[question.type] = 0;
      return acc;
    }, {});

    // 1 true = 1 pont, 1 false = 0 point
    const calculatedPoints = questions.reduce((acc, question) => {
      if (question.answer === true) {
        acc[question.type] += 1;
      }
      return acc;
    }, initialPoints);

    setPoints(calculatedPoints);
    setIsSubmitted(true);
  };

  return (
    <div className="px-10 pb-10 pt-5">
      {isSubmitted ? (
        <ResultPage points={points} />
      ) : (
        <>
          <QuestionPage questions={questions} setQuestions={setQuestions} />
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-200 w-full md:max-w-[50%] mx-auto flex justify-center px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default App;
