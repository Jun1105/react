import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import About from "./components/About"
import Pdf from "./components/Pdf"

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to React Router!</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="pdfpreview" element={<Pdf />} />
      </Routes>
    </div>
  );
}

export default App