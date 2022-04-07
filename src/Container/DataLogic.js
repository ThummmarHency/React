import axios from "axios";

const token="token";

let getData = localStorage.getItem(token);
const data1= JSON.parse(getData);
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
  console.log(response.data);
  response && alert(response.data.message);
  if(window.location.pathname==="/student-dashboard/pending-exam"){window.location="/student-dashboard/all-exam"}
  if(window.location.pathname==="/teacher-dashboard/create-exam"){window.location="/teacher-dashboard/view-exam"}
  if ((api === "/users/SignUp" || api==="/users/ResetPassword") && response.data.statusCode === 200) {
    window.location = "/login";
  }
    if(api === "/users/Login" && response.data.statusCode === 200 && response.data.data.role==="teacher"){
    window.location = "/teacher-dashboard/student-data";
    localStorage.setItem(token, JSON.stringify(response.data));
    localStorage.setItem("isAuthenticated", true);
    }else{
      if(api === "/users/Login" && response.data.statusCode === 200){
      window.location = "/student-dashboard/all-exam";
      localStorage.setItem(token, JSON.stringify(response.data));
      localStorage.setItem("isAuthenticated", true);
    }}
  return response.data;
}


export  async function fetchDataGet(Api,setStuData,setRows,setResultData) {
  const res = await axios.get(
    process.env.REACT_APP_API + `${Api}`,
    { headers: { "access-token": `${getToken}` } }
  );

setStuData && setStuData(res.data.data);
setRows && setRows(res.data.data);
setResultData && setResultData(res.data.data)

}

export async function fetchDataDel(Api){
  const res=await axios.delete(process.env.REACT_APP_API + `${Api}`, {
    headers: {
      "access-token": `${getToken}`
    },
  });
return res;
}

export async function fetchDataPut(api,user){
  const res=await axios.put(process.env.REACT_APP_API + `${api}`,
  user,
  {
    headers: {
      "access-token": `${getToken}`
    },
  });
  alert(res.data.message)
  localStorage.removeItem('subjectName')
  localStorage.removeItem('notes')
  res.data.statusCode === 200 ? window.location = "./view-exam" : alert(res.data.message)
return res;
}
