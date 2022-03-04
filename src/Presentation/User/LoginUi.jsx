import React, { useState} from "react";
import { Link } from "react-router-dom";
import Reuse from "../../Shared/Reuse";
import {FormAttribute} from '../../Container/FormAttribute'

const LoginUi = () => {

  const formattribute =[
    FormAttribute[0], FormAttribute[1],
  ]
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      {
        <div>
          <Reuse text="login" api="/users/Login" attribute={formattribute} setValues={setValues} values={values} />
          <Link to="/ForgotPassword">Forgot password?</Link>
          <br />
          <Link to="/signup">Don't have an account? Please Sign up</Link>
        </div>     
      }
    </div>
  );
};

export default React.memo(LoginUi)
