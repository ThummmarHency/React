import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Loginlogic from './Container/Loginlogic';
import SignupUI from './Presentation/SignupUI';
import LoginUI from './Presentation/LoginUI';

function App() {
  return (
    <>
    <BrowserRouter path>
        <Routes>
          <Route path="/" element={<LoginUI/>} />
          <Route path="/Signup" element={<SignupUI/>} />
    
        </Routes>
</BrowserRouter>
    </>
  );
}

export default App;
