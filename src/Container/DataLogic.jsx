import axios from "axios";

let getData = localStorage.getItem("token");
const data1= JSON.parse(getData);
export const getToken = data1 && data1.data.token;


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
  if ((api === "/users/SignUp" || api==="/users/ResetPassword") && response.data.statusCode === 200) {
    window.location = "/login";
  }
    if(api === "/users/Login" && response.data.statusCode === 200){
    window.location = "/dashboard";
    localStorage.setItem("token", JSON.stringify(response.data));
    localStorage.setItem("isAuthenticated", true);
    }
  return response.data;
}


export  async function fetchDataGet(Api,setStuData,setRows,setResultData) {
  const res = await axios.get(
    process.env.REACT_APP_API + `${Api}`,
    { headers: { "access-token": `${getToken}` } }
  );
// alert(res.data.message)
setStuData && setStuData(res.data.data);
setRows && setRows(res.data.data);
setResultData && setResultData(res.data.data[0])

}

