import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import Login from "../src/components/user/login/loginPages";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
    
      </Routes>
    </Router>
  );
}


