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
      const formData = JSON.parse(storedFormData);
      if (formData.result) {
        setIsSubmitted(true);
      }
      setFormData(formData); // Set data form jika ada

      // Jika formData sudah ada dan terdapat topThree, set isSubmitted menjadi true
    } else {
      navigate("/register"); // Arahkan ke halaman register jika formData tidak ada
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

    // Membuat objek hasil dengan semua data poin
    const result = Object.entries(calculatedPoints).map(([type, points]) => ({
      type,
      points,
    }));

    // Mendapatkan data formulir yang sudah ada di localStorage
    const formData = JSON.parse(localStorage.getItem("formData")) || {};

    // Menambahkan hasil ke dalam formData
    formData.result = result;

    // Simpan objek formData yang sudah diperbarui ke localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Simpan points dan set isSubmitted
    setPoints(calculatedPoints);
    setIsSubmitted(true);
  };

  return (
    <div className="px-10 pb-10 pt-5 flex justify-center items-center min-h-screen">
      {formData && !isSubmitted && !startTest && (
        <div className="mb-5 p-4 w-fit mx-auto border rounded-md bg-gray-100 shadow-md">
          <h2 className="text-lg md:text-3xl font-semibold mb-3">Form Data</h2>
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
