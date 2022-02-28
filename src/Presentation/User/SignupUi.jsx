import React, { useState } from "react";
import DataLogic from "../../Container/DataLogic";
import {formattribute} from '../User/LoginUi'


export  const attribute=[
  ...formattribute,
  {
    
    label: "Name : ",
    type: "text",
    name: "name",
    placeholder: "Enter name",
    errorMsg: "Name should be 3-16 character and shouldn't include any special character",
    pattern:"^[A-Za-z0-9]{3,16}$",
  },
  {
   
    label: "Role : ",
    type: "text",
    name: "role",
    placeholder: "student/teacher",
    errorMsg: "Role should be either student or teacher ",
    pattern:"^student|teacher$",
   
  },
]

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
          <DataLogic text="Signup" api="/users/SignUp" attribute={attribute} setValues={setValues} values={values}  />
        </div>
      }
    </div>
  );
};

export default SignupUI;
