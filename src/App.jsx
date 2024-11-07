import React, { useState } from "react";
import Application from "./pages/Aplication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstForm from "./pages/FirstForm";

function App() {
  const [formData, setFormData] = useState({
    noFormulir: "",
    email: "",
    name: "",
    dob: "",
    jurusan: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={<FirstForm formData={formData} setFormData={setFormData} />}
        />
        <Route path="/" element={<Application formData={formData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
