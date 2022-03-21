import React, { useState, useEffect } from "react";
import { NewPwdToken, fetchDataPost } from "./DataLogic";
import { FormAttribute } from "../Container/FormAttribute";
import { getToken } from "./DataLogic";

const useForm = ({ setValues, values, newToken, api }) => {
  var pv = Object.values(FormAttribute).map((e) => {
    return { [e.name]: e.pattern };
  });
  const [error, setError] = useState("");
  const [patternError, setpatternError] = useState(false);

  useEffect(() => {

    
  },[values])
  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    isValidate()
    //  for(let i=0;i<Object.keys(values).length;i++){
    //   setpatternError(Object.values(pv[i])[0].test(Object.values(values)[i])===true ? true: false)
    // }
  };
  const isValidate = () => {
    let isValid = true;

    if(values.email){
      if(pv[0].email.test(values.email) === true){isValid = false}else{isValid = true}
    }
    if(values.password){
      if(pv[1].password.test(values.password) === true){isValid = false}else{isValid = true}
    }
    if(values.name){
      if(pv[2].name.test(values.name) === true){isValid = false}else{isValid = true}
    }
    if(values.role){
      if(pv[3].role.test(values.role) === true){isValid = false}else{isValid = true}
    }
    
    return isValid;
  };
  console.log("values", values);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    newToken && NewPwdToken(newToken);
  console.log("sValidate", isValidate());

    Object.values(values).some((e) => e === "") === false
      ? isValidate()===false && fetchDataPost(api, getToken, user)
      : setError("This field is Required");
  };
  return [{ onChange, handleSubmit, error }];
};

export default useForm;
