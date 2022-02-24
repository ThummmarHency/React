import React from 'react'
import axios from "axios";
import CustomInput from '../Shared/CustomInput';
import CustomButton from "../Shared/CustomButton";
import attribute from "../Shared/Reuse";
import {useNavigate} from 'react-router-dom'

const LoginLogic = ({value,api,setValues,values,obj}) => {
  let naviGate = useNavigate();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    const response = await axios.post(
      process.env.REACT_APP_API + `${api}`,
      user
    );
    api==="/users/Login" &&  response.data.statusCode===200?naviGate("/dashboard"):alert(response.data.message);

    api==="/users/Login" &&  localStorage.setItem("token", JSON.stringify(response.data)) ;
    console.log(response.data);
    
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {attribute.map((input) => {
              return (input.login  === obj || input.signup === obj || input.forgotpwd === obj || input.newpassword===obj) ? (
                <CustomInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ) : null;
            })}
            {<CustomButton type="submit" value={value} />}
          </form>
    </div>
  )
}

export default LoginLogic