import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupUi from "./Presentation/User/SignupUi";
import LoginUi from "./Presentation/User/LoginUi";
import ForgotPwd from "./Presentation/User/ForgotPwd";
import NewPwd from "./Presentation/User/NewPwd";
import Logout from "./Presentation/User/Logout"
import PageNotFound from "./Presentation/User/PageNotFound";
import DashBoard from "./Presentation/Teacher/DashBoard";
import Navbar from "./Presentation/Navbar";
import ShowStudentData from "./Presentation/Teacher/ShowStudentData";
import VerifyData from "./Presentation/Teacher/VerifyData";
import ViewData from "./Presentation/Teacher/ViewData";
import ProtectedRoute from "./Container/ProtectedRoute";
import CreateExam from "./Presentation/Teacher/CreateExam";
import ResetPwd from "./Presentation/User/ResetPwd";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute Com={Navbar} />}>
            <Route
              exact
              path="login"
              element={<ProtectedRoute Com={LoginUi} />}
            />

            <Route
              exact
              path="signup"
              element={<ProtectedRoute Com={SignupUi} />}
            />

            <Route
              exact
              path="logout"
              element={<ProtectedRoute Com={Logout} />}
            />

            <Route
              exact
              path="ForgotPassword"
              element={<ProtectedRoute Com={ForgotPwd} />}
            />
            <Route
              exact
              path="resetpwd"
              element={<ProtectedRoute Com={ResetPwd} />}
            />
            <Route
              exact
              path="dashboard"
              element={<ProtectedRoute Com={DashBoard} />}
            >
              <Route  path="studentdata" element={<ProtectedRoute Com={ShowStudentData} />} />
              <Route  path="verifieddata" element={<ProtectedRoute Com={VerifyData} />} />
              <Route  path="viewData" element={<ProtectedRoute Com={ViewData} />} />
              <Route  path="createexam" element={<ProtectedRoute Com={CreateExam} />} />
            </Route>

          </Route>
          <Route
              exact
              path="newPassword"
              element={<NewPwd/>}
            />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
