import { useState, useEffect } from "react";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import questionsData from "../data/questionsData";
import { useNavigate } from "react-router";

function Application() {
  const [questions, setQuestions] = useState(questionsData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [points, setPoints] = useState({});
  const [formData, setFormData] = useState(null);
  const [startTest, setStartTest] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // State untuk welcome screen
  const navigate = useNavigate();

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      if (formData.result) {
        setIsSubmitted(true);
      }
      setFormData(formData);
    }
  }, []);

  const handleStartWelcome = () => {
    setShowWelcome(false); // Sembunyikan welcome screen
    if (!formData) {
      navigate("/register"); // Jika belum ada data, redirect ke register
    }
  };

  // const handleRegisterComplete = () => {
  //   navigate("/"); // Redirect ke halaman awal setelah register
  //   setShowWelcome(false);
  // };

  const handleSubmit = () => {
    const allAnswered = questions.every((question) => question.answer !== null);

    if (!allAnswered) {
      alert("Please fill in all the questions");
      return;
    }

    const initialPoints = questions.reduce((acc, question) => {
      acc[question.type] = 0;
      return acc;
    }, {});

    const calculatedPoints = questions.reduce((acc, question) => {
      if (question.answer === true) {
        acc[question.type] += 1;
      }
      return acc;
    }, initialPoints);

    const result = Object.entries(calculatedPoints).map(([type, points]) => ({
      type,
      points,
    }));

    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    formData.result = result;

    localStorage.setItem("formData", JSON.stringify(formData));

    setPoints(calculatedPoints);
    setIsSubmitted(true);
  };

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
  }, []);

  return (
    <div className="px-10 pb-10 pt-5 flex justify-center items-center min-h-screen max-w-[760px] mx-auto">
      {showWelcome && (
        <div className="mb-5 p-4 w-fit mx-auto border rounded-md bg-gray-100 shadow-md text-center">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">
            Welcome to Career Pathway Test
          </h1>
          <p className="text-lg mb-5">
            This application helps individuals discover careers that align with
            their interests, preferences, and personality, guiding them toward
            more fulfilling career choices.
          </p>
          <button
            onClick={handleStartWelcome}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Start
          </button>
        </div>
      )}

      {!showWelcome && formData && !isSubmitted && !startTest && (
        <div className="mb-5 p-4 w-fit mx-auto border rounded-md bg-gray-100 shadow-md">
          <h2 className="text-lg md:text-3xl font-semibold mb-3">
            Career Pathway Test
          </h2>
          <p>
            You can review and confirm your details below before starting the
            test:
          </p>
          <div className="my-5">
            <div className="flex justify-between">
              <p className="w-1/4">Form Number</p>
              <p className="w-3/4">: {formData.noFormulir}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/4">Name</p>
              <p className="w-3/4">: {formData.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/4">E-mail</p>
              <p className="w-3/4">: {formData.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/4">Date of Birth</p>
              <p className="w-3/4">: {formData.dob}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/4">Departement</p>
              <p className="w-3/4">
                :{" "}
                {formData.jurusan === "cp"
                  ? "Creativepreneurship"
                  : "Digital Business Innovation"}
              </p>
            </div>
          </div>

          {!startTest && (
            <>
              <p className="mt-3 text-sm text-black">
                If the information is <b>Correct</b>, please click 'Accept and
                Start Test' to begin.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const isConfirmed = window.confirm(
                      "Please be sure the data is correct"
                    );
                    if (isConfirmed) {
                      setStartTest(true);
                    }
                  }}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Accept and Start Test
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("formData");
                    setFormData(null);
                    navigate("/register");
                  }}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {isSubmitted && <ResultPage points={points} />}
      {startTest && !isSubmitted && (
        <QuestionPage
          questions={questions}
          setQuestions={setQuestions}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Application;
