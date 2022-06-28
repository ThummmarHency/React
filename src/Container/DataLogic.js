import axios from "axios";
const allExam = "/student-dashboard/all-exam";
const pendingExam = "/student-dashboard/pending-exam";
const createExam = "/teacher-dashboard/create-exam";
const viewExam = "/teacher-dashboard/view-exam";
const token = "token";

let getData = localStorage.getItem(token);
const data1 = JSON.parse(getData);
console.log("data1", data1);
export const getToken = data1 && data1?.data?.token;

export async function NewPwdToken(newToken) {
  const NewPwdCheck = await axios.get(
    process.env.REACT_APP_API + `${newToken}`
  );
  return NewPwdCheck;
}

export async function fetchDataPost(api, getToken, user) {
  const response = await axios.post(
    process.env.REACT_APP_API + `${api}`,
    user,
    { headers: { "access-token": `${getToken}` } }
  );
  response && alert(response.data.message);
  if (window.location.pathname === pendingExam) {
    window.location = allExam;
  }
  if (window.location.pathname === createExam) {
    window.location = viewExam;
  }
  if (
    (api === "/users/SignUp" || api === "/users/ResetPassword") &&
    response.data.statusCode === 200
  ) {
    window.location = "/login";
  }
  if (
    api === "/users/Login" &&
    response.data.statusCode === 200 &&
    response.data.data.role === "teacher"
  ) {
    window.location = "/teacher-dashboard/student-data";
    localStorage.setItem(token, JSON.stringify(response.data));
    localStorage.setItem("isAuthenticated", true);
  } else {
    if (api === "/users/Login" && response.data.statusCode === 200) {
      window.location = allExam;
      localStorage.setItem(token, JSON.stringify(response.data));
      localStorage.setItem("isAuthenticated", true);
    }
  }
  return response.data;
}

export async function fetchDataGet(Api, setStuData, setRows, setResultData) {
  const res = await axios.get(process.env.REACT_APP_API + `${Api}`, {
    headers: { "access-token": `${getToken}` },
  });
  if (
    window.location.pathname === "/student-dashboard/exam-paper" &&
    res.data.data === null &&
    res.data.statusCode === 500
  ) {
    if (alert("You can not give exam again")) {
      window.location = allExam;
    } else {
      window.location = allExam;
    }
  } else {
    setStuData && setStuData(res.data.data);
    setRows && setRows(res.data.data);
    setResultData && setResultData(res.data.data);
  }
}

export async function fetchDataDel(Api) {
  const res = await axios.delete(process.env.REACT_APP_API + `${Api}`, {
    headers: {
      "access-token": `${getToken}`,
    },
  });
  return res;
}

export async function fetchDataPut(api, user) {
  const res = await axios.put(process.env.REACT_APP_API + `${api}`, user, {
    headers: {
      "access-token": `${getToken}`,
    },
  });
  localStorage.removeItem("subjectName");
  localStorage.removeItem("notes");
  res.data.statusCode === 200 &&
  window.location.pathname !== "/student-dashboard/edit-profile"
    ? (window.location = "./view-exam") && alert(res.data.message)
    : res.data.statusCode === 200 &&
      window.location.pathname === "/student-dashboard/edit-profile"
    ? (window.location = "/student-dashboard/profile") &&
      alert(res.data.message)
    : alert(res.data.message);

  return res;
}
