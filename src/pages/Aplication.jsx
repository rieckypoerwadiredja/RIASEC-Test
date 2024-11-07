import { useEffect, useState } from "react";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import questionsData from "../data/questionsData";
import { useNavigate } from "react-router";

function Application({ formData }) {
  const [questions, setQuestions] = useState(questionsData); // todo: List Data

  const [isSubmitted, setIsSubmitted] = useState(false); // todo: Submit lalu tampilkan resultnya
  const [points, setPoints] = useState({}); // todo: menghitung jml point tiap jenisnya

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Check if noFormulir or email is empty
    if (!formData.noFormulir || !formData.email) {
      navigate("/register"); // Redirect to register page
    }
  }, [formData, navigate]); // Trigger when formData changes

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
            Let's Start
          </button>
        </>
      )}
    </div>
  );
}

export default Application;
