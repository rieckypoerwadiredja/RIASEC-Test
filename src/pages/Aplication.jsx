import { useState, useEffect } from "react";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import questionsData from "../data/questionsData";
import { useNavigate } from "react-router";
// Images
import creative_img from "../assets/images/creative.png";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
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
    <div className="flex flex-col justify-center items-center mx-auto">
      {showWelcome && (
        <>
          <div className="relative !max-h-[calc(100%-96px)] flex flex-col justify-center w-full">
            <img
              className="mx-auto h-full mt-5 object-contain"
              src={creative_img}
              alt="Creative Image"
            />
            <h1 className="text-2xl md:text-4xl font-semibold my-4 !mx-auto w-fit text-center">
              Welcome to Career Pathway Test
            </h1>
            <p className="text-lg mb-5 text-center max-w-[765px] mx-auto">
              This application helps individuals discover careers that align
              with their interests, preferences, and personality, guiding them
              toward more fulfilling career choices.
            </p>
            <button
              onClick={handleStartWelcome}
              className="px-5 sm:px-20 font-medium uppercase py-2 bg-third mx-auto text-white rounded-3xl shadow-sm hover:bg-third/80"
            >
              Start
            </button>
          </div>
          <Footer />
        </>
      )}

      {!showWelcome && formData && !isSubmitted && !startTest && (
        <>
          <div className="relative mb-5 p-4 w-fit mx-auto rounded-md mt-10">
            <>
              <h2 className="text-3xl text-center md:text-3xl font-semibold mb-3">
                Career Pathway Test
              </h2>
              <p>
                You can review and confirm your details below before starting
                the test:
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
            </>

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
                    className="px-5 font-medium uppercase py-2 bg-primary mt-5 text-white rounded-3xl shadow-sm hover:bg-primary/80"
                  >
                    Accept and Start Test
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("formData");
                      setFormData(null);
                      navigate("/register");
                    }}
                    className="px-5 font-medium uppercase py-2 bg-third mt-5 text-white rounded-3xl shadow-sm hover:bg-third/80"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
          <Footer />
        </>
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
