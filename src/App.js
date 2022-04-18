import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider,QueryClient } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
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
import Profile from "./Presentation/Student/Profile"
import EditProfile from "./Presentation/Student/EditProfile"
import RQStudentData from "./Presentation/React Query/RQStudentData";
import RQindData from "./Presentation/React Query/RQindData";
import RQPaginated from "./Presentation/React Query/RQPaginated"
import RQInfinite from "./Presentation/React Query/RQInfinite";
import RQMutation from "./Presentation/React Query/RQMutation"
import AxiosFetch from "./Presentation/React Query/AxiosFetch";
import RQDemo from "./Presentation/React Query/Demo/RQDemo";
import DemoUpdate from "./Presentation/React Query/Demo/DemoUpdate";
import DemoAdd from "./Presentation/React Query/Demo/DemoAdd";
// import Sample from "./Presentation/Teacher/Sample";

const queryClient= new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
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
                path="RQ-student-data"
                element={<ProtectedRoute Com={RQStudentData} />}
              />
              <Route
                path="RQ-student-data/:stuId"
                element={<ProtectedRoute Com={RQindData} />}
              />
              <Route
                path="RQ-paginated"
                element={<ProtectedRoute Com={RQPaginated} />}
              />
              <Route
                path="RQ-infinite"
                element={<ProtectedRoute Com={RQInfinite} />}
              />
              <Route
                path="RQ-mutation"
                element={<ProtectedRoute Com={RQMutation} />}
              />
               <Route
                path="axios-fetch"
                element={<ProtectedRoute Com={AxiosFetch} />}
              />
               <Route
                path="RQ-demo"
                element={<ProtectedRoute Com={RQDemo} />}
              />
              <Route
                path="demo-update/:stuId"
                element={<ProtectedRoute Com={DemoUpdate} />}
              />
               <Route
                path="demo-add"
                element={<ProtectedRoute Com={DemoAdd} />}
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
              <Route
                path="profile"
                element={<ProtectedRoute Com={Profile} />}
              />
               <Route
                path="edit-profile"
                element={<ProtectedRoute Com={EditProfile} />}
              />
            </Route>
          </Route>
          <Route exact path="newPassword" element={<NewPwd />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
      </QueryClientProvider>
    </>
  );
}

export default App;
