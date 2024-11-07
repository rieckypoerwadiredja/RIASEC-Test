import { useState, useEffect } from "react";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import questionsData from "../data/questionsData";
import { useNavigate } from "react-router";

function Application() {
  const [questions, setQuestions] = useState(questionsData); // List Data
  const [isSubmitted, setIsSubmitted] = useState(false); // Submit lalu tampilkan resultnya
  const [points, setPoints] = useState({}); // Menghitung jumlah point tiap jenisnya
  const [formData, setFormData] = useState(null); // Menyimpan data form jika ada di local storage
  const [startTest, setStartTest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah data form ada di local storage
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData)); // Set data form jika ada
    } else {
      navigate("/register");
    }
  }, []);

  const handleSubmit = () => {
    // Validasi semua pertanyaan sudah dijawab (tidak ada nilai null)
    const allAnswered = questions.every((question) => question.answer !== null);

    if (!allAnswered) {
      alert("Please fill in all the questions");
      return;
    }

    // Set semua point awal menjadi 0
    const initialPoints = questions.reduce((acc, question) => {
      acc[question.type] = 0;
      return acc;
    }, {});

    // 1 true = 1 point, 1 false = 0 point
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
      {formData && !isSubmitted && (
        <div className="mb-5 p-4 border rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold">Form Data</h2>
          <p>No Formulir: {formData.noFormulir}</p>
          <p>Email: {formData.email}</p>
          <p>Name: {formData.name}</p>
          <p>Date of Birth: {formData.dob}</p>
          <p>Jurusan: {formData.jurusan}</p>
          {!startTest && (
            <>
              <p className="mt-3 text-sm text-red-500">
                Jika ini bukan data Anda, silakan klik tombol di bawah untuk
                menghapus data.
              </p>
              <div>
                <button
                  onClick={() => {
                    setStartTest(true);
                  }}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Accept and Start Test
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("formData"); // Hapus data dari local storage
                    setFormData(null); // Update state agar tampilan diperbarui
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
