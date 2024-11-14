import React, { useState } from "react";
import { useNavigate } from "react-router";
import innovative_img from "../assets/images/full_innovative.jpg";
import Footer from "../component/Footer";
function FirstForm() {
  const [noFormulir, setNoFormulir] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleStartTest = () => {
    const newErrors = {};

    // Validasi No Formulir
    if (!/^\d+$/.test(noFormulir)) {
      newErrors.noFormulir = "Form Number must be digits only.";
    }

    // Email Validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    // Name Validation
    if (!name) {
      newErrors.name = "Name cannot be empty.";
    }

    // Date of Birth Validation
    if (!dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    // Major Validation
    if (!jurusan) {
      newErrors.jurusan = "Major must be selected.";
    }

    setErrors(newErrors);

    // Lanjutkan jika tidak ada error
    if (Object.keys(newErrors).length === 0) {
      // Buat satu objek dengan semua data
      const formData = {
        noFormulir,
        email,
        name,
        dob,
        jurusan,
      };

      // Simpan objek ke local storage
      localStorage.setItem("formData", JSON.stringify(formData));

      console.log("Formulir valid. Mulai test...");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-5">
      <div className="w-full flex flex-col items-center max-w-sm">
        <h2 className="text-lg md:text-3xl font-semibold mb-3 mx-auto">
          Registration
        </h2>
        <form
          className="w-full rounded px-8 pt-2 mx-auto pb-8 mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-2"
              htmlFor="noFormulir"
            >
              Form Number
            </label>
            <input
              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="noFormulir"
              type="text"
              placeholder="Enter Form Number"
              value={noFormulir}
              onChange={(e) => setNoFormulir(e.target.value)}
            />
            {errors.noFormulir && (
              <p className="text-red-500 text-xs italic">{errors.noFormulir}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-2"
              htmlFor="email"
            >
              E-mail (Personal)
            </label>
            <input
              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs italic">{errors.dob}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-2"
              htmlFor="jurusan"
            >
              Departement
            </label>
            <select
              className="shadow appearance-none placeholder-primary font-semibold border-primary text-primary border rounded-3xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="jurusan"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
            >
              <option value="" disabled>
                Please select a department
              </option>
              <option value="cp">Creativepreneurship</option>
              <option value="dbi">Digital Business Innovation</option>
            </select>
            {errors.jurusan && (
              <p className="text-red-500 text-xs italic">{errors.jurusan}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="px-5 mt-5 sm:px-14 shadow-md font-medium uppercase py-2 bg-third mx-auto text-white rounded-3xl hover:bg-third/80"
              type="button"
              onClick={handleStartTest}
            >
              Registration
            </button>
          </div>
        </form>
      </div>
      <img className="" src={innovative_img} alt="" />
      <Footer isWave={false} />
    </div>
  );
}

export default FirstForm;
