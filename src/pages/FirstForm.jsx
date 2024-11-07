import React, { useState } from "react";
import SecondForm from "./SecondForm";
import Application from "./Aplication";

function FirstForm() {
  const [formStatus, setFormStatus] = useState("firstForm"); // 'firstForm' or 'nextForm' or 'app'
  const [errors, setErrors] = useState({});
  const [noFormulir, setNoFormulir] = useState(""); // State for No Formulir
  const [email, setEmail] = useState(""); // State for Email

  // Validasi sederhana tanpa database
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input form
    const newErrors = {};
    if (!/^\d{10}$/.test(noFormulir)) {
      newErrors.noFormulir = "No Formulir harus berupa angka dan 10 karakter";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Email tidak valid";
    }

    // Set error jika ada
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    // Logika pengecekan data tanpa database
    const isFormulirExist =
      noFormulir === "1234567890" && email === "test@example.com";

    if (isFormulirExist) {
      setFormStatus("app"); // Jika data sudah "ada," langsung masuk aplikasi
    } else {
      setFormStatus("nextForm"); // Jika tidak, lanjut ke form berikutnya
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        {formStatus === "firstForm" && (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="noFormulir"
              >
                No Formulir
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="noFormulir"
                type="text"
                placeholder="Enter Form Number"
                value={noFormulir}
                onChange={(e) => setNoFormulir(e.target.value)}
              />
              {errors.noFormulir && (
                <p className="text-red-500 text-xs italic">
                  {errors.noFormulir}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Pribadi
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {formStatus === "nextForm" && (
          <SecondForm noFormulir={noFormulir} email={email} />
        )}

        {formStatus === "app" && <Application />}
      </div>
    </div>
  );
}

export default FirstForm;
