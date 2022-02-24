import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignupUi from './Presentation/User/SignupUi';
import LoginUi from './Presentation/User/LoginUi';
import ForgotPwd from './Presentation/User/ForgotPwd';
import NewPwd from './Presentation/User/NewPwd';
import PageNotFound from './Presentation/User/PageNotFound';
import DashBoard from './Presentation/Teacher/DashBoard';
import Navbar from './Presentation/Navbar';

function App() {
  return (
    <>
    <BrowserRouter path>
        <Routes>
          <Route exact path="/" element={<Navbar/>} >
          <Route exact path="login" element={<LoginUi/>} />
          <Route exact path="Signup" element={<SignupUi/>} />
          <Route exact path="ForgotPassword" element={<ForgotPwd/>} />
          <Route exact path="newPassword" element={<NewPwd/>} />
          <Route exact path="dashboard" element={<DashBoard/>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
</BrowserRouter>
    </>
  );
}

export default App;
