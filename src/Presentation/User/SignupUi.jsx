import React, { useState } from "react";
import Reuse from "../../Shared/Reuse";
import {FormAttribute} from '../../Container/FormAttribute'
export  const attribute=[
  FormAttribute[0],
  FormAttribute[1],
  FormAttribute[2],
  FormAttribute[3],
]

const SignupUI = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
 

  return (
    <div>
      {
        <div>
          <Reuse text="Signup" api="/users/SignUp" attribute={attribute} setValues={setValues} values={values}  />

        </div>
      }
    </div>
  );
};

export default SignupUI;
