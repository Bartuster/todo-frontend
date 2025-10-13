import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
      </Routes>
    </Router>
  );
}
