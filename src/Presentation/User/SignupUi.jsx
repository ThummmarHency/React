import React, { useState } from "react";
import DataLogic from "../../Container/DataLogic";
const SignupUI = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  return (
    <div>
      {
        <div>
          <DataLogic value="Signup" api="/users/SignUp" setValues={setValues} values={values} obj="signUp" />
        </div>
      }
    </div>
  );
};

export default SignupUI;
