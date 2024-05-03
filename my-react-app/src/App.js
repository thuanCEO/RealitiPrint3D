import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/components/user/login/loginPages";
import HomePage from "../src/containers/home/homePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginAccount" element={<Login />} />
      </Routes>
    </Router>
  );
}
