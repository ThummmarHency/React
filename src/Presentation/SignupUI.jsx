import React, { useState } from "react";
// import Loginlogic from "../Container/Loginlogic";
import axios from "axios"
import CustomButton from "../Shared/CustomButton";
import CustomInput from "../Shared/CustomInput";
import attribute from "../Shared/Reuse";
const SignupUI = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const Login = async (e) => {
    e.preventDefault();
    const user = { ...values };
  
     const response = await axios.post(
       process.env.REACT_APP_API+"/SignUp",
     user
    )
    console.log(response.data)}

  return (
    <div>
      {
        <div>
          <form onSubmit={Login}>
            {attribute.map((input) => {
              return input.signup ? (
                <CustomInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ) : null;
            })}
            {<CustomButton type="submit" value="SignUp" />}
          </form>
        </div>
      }
    </div>
  );
};

export default SignupUI;
