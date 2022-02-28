import React,{useState} from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import FormView from '../Presentation/User/FormView';

const DataLogic = ({text,api,setValues,values,attribute}) => {
  const [error, seterror] = useState("")

  let naviGate = useNavigate();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { ...values };
    async function fetchdata() {
      const response = await axios.post(
        process.env.REACT_APP_API + `${api}`,
        user
      );
      api === "/users/Login" && response.data.statusCode === 200 ? naviGate("../dashboard") : alert(response.data.message);
      (api === "/users/Login" && response.data.statusCode === 200) && localStorage.setItem("token", JSON.stringify(response.data));
      (api === "/users/Login" && response.data.statusCode === 200) && localStorage.setItem("isAuthenticated", true);

      (api==="/users/SignUp" && response.data.statusCode === 200) && naviGate("../login")

      console.log(response.data)
    }
    (Object.values(values).some(e => e === "")) === false ? fetchdata() : seterror("This field is Required")
    
  };

  return (
    <div>
       <FormView handleSubmit={handleSubmit} attribute={attribute} error={error}  values={values} onChange={onChange} text={text}/>
    </div>
  )
}

export default React.memo(DataLogic)