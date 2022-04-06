import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupUi from "./Presentation/User/SignupUi";
import LoginUi from "./Presentation/User/LoginUi";
import ForgotPwd from "./Presentation/User/ForgotPwd";
import NewPwd from "./Presentation/User/NewPwd";
import Logout from "./Presentation/User/Logout";
import PageNotFound from "./Presentation/User/PageNotFound";
import DashBoard from "./Presentation/Teacher/DashBoard";
import Navbar from "./Presentation/Navbar";
import ShowStudentData from "./Presentation/Teacher/ShowStudentData";
import VerifyData from "./Presentation/Teacher/VerifyData";
import ViewData from "./Presentation/Teacher/ViewData";
import ProtectedRoute from "./Container/ProtectedRoute";
import CreateExam from "./Presentation/Teacher/CreateExam";
import ViewExam from "./Presentation/Teacher/ViewExam";
import ExamDetail from "./Presentation/Teacher/ExamDetail"
import ResetPwd from "./Presentation/User/ResetPwd";
import SDashBoard from "./Presentation/Student/SDashBoard";
import EditExam from "./Presentation/Teacher/EditExam";
import AllExam from "./Presentation/Student/AllExam";
import ExamPaper from "./Presentation/Student/ExamPaper";
import PendingExam from "./Presentation/Student/PendingExam";
import Sample from "./Presentation/Teacher/Sample";

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
              path="reset-pwd"
              element={<ProtectedRoute Com={ResetPwd} />}
            />
            <Route
              exact
              path="teacher-dashboard"
              element={<ProtectedRoute Com={DashBoard} />}
            >
              <Route
                path="student-data"
                element={<ProtectedRoute Com={ShowStudentData} />}
              />
              <Route
                path="verified-data"
                element={<ProtectedRoute Com={VerifyData} />}
              />
              <Route
                path="view-data"
                element={<ProtectedRoute Com={ViewData} />}
              />
              <Route
                path="create-exam"
                element={<ProtectedRoute Com={CreateExam} />}
              />
              <Route
                path="view-exam"
                element={<ProtectedRoute Com={ViewExam} />}
              />
              <Route
                path="edit-exam"
                element={<ProtectedRoute Com={EditExam} />}
              />
              <Route
                path="exam-detail"
                element={<ProtectedRoute Com={ExamDetail} />}
              />
            </Route>
            <Route
               path="student-dashboard"
               element={<ProtectedRoute Com={SDashBoard} />}
            >
              <Route
                path="all-exam"
                element={<ProtectedRoute Com={AllExam} />}
              />
              <Route
                path="exam-paper"
                element={<ProtectedRoute Com={ExamPaper} />}
              />
              <Route
                path="pending-exam"
                element={<ProtectedRoute Com={PendingExam} />}
              />
            </Route>
          </Route>
          

          <Route exact path="newPassword" element={<NewPwd />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
