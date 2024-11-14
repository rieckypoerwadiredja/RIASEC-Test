import React, { useState } from "react";
import Application from "./pages/Aplication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstForm from "./pages/FirstForm";
import Nav from "./component/Nav";
import Footer from "./component/Footer";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/register" element={<FirstForm />} />
        <Route path="/" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
