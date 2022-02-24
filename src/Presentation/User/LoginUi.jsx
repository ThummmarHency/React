import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataLogic from "../../Container/DataLogic"
const LoginUI = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      {
        <div>
          <DataLogic value="login" api="/users/Login" setValues={setValues} values={values} obj="login"/>
          <Link to="/ForgotPassword">Forgot password?</Link>
          <br />
          <Link to="/Signup">Don't have an account? Please Sign up</Link>
        </div>     
      }
    </div>
  );
};

export default LoginUI;
