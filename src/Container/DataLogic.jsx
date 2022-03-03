import axios from "axios";

 export const onChange = (e,setValues,values) => {
   return setValues({ ...values, [e.target.name]: e.target.value });
  };
  export  async function NewpwdToken(newToken){
      const NewPwdCheck =await axios.get(
        process.env.REACT_APP_API + `${newToken}`
      )
    }
  export async function fetchdata(api,token1,user) { 
      const response = await axios.post(
        process.env.REACT_APP_API + `${api}`,
        user,
        { headers: { "access-token": `${token1}` } }
      );
      
      return response.data
    }
