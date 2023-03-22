import React from "react"
import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import Messagerie from "./Components/Messagerie"
import Forgot from "./Components/Forgot"
import Balance from "./Components/Balance"
import Adress from "./Components/Adress"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


export default function Main() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Messagerie" element={<Messagerie />}/>
        <Route path="/Forgot" element={<Forgot />}/>
        <Route path="/Balance" element={<Balance />}/>
        <Route path="/Adress" element={<Adress />}/>
        
      </Routes>
    </Router>
  );
}