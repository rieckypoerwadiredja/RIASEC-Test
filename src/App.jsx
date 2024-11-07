import React, { useState } from "react";
import Application from "./pages/Aplication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstForm from "./pages/FirstForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<FirstForm />} />
        <Route path="/" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
