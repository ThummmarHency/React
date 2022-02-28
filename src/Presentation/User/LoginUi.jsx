import React, { useState} from "react";
import { Link } from "react-router-dom";
import DataLogic from "../../Container/DataLogic";

export const formattribute =[
  {
    label: "Email : ",
    type: "text",
    name: "email",
    placeholder: "Enter Your email",
    errorMsg: "it should be a valid email address",  
    pattern: "^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"

  },
  {
    label: "Password : ",
    type: "password",
    name: "password",
    placeholder: "Enter password",
    errorMsg: "password should be 8-16 characters long",
    pattern:"^[A-Za-z0-9]{8,16}$"
  },
]
const LoginUi = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      {
        <div>
          <DataLogic text="login" api="/users/Login" attribute={formattribute} setValues={setValues} values={values} />
          <Link to="/ForgotPassword">Forgot password?</Link>
          <br />
          <Link to="/signup">Don't have an account? Please Sign up</Link>
        </div>     
      }
    </div>
  );
};

export default React.memo(LoginUi)
