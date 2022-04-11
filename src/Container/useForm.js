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
    // isValidate()
    //  for(let i=0;i<Object.keys(values).length;i++){
    //   setpatternError(Object.values(pv[i])[0].test(Object.values(values)[i])===true ? true: false)
    // }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    newToken && NewPwdToken(newToken);
    Object.values(values).some((e) => e === "") === false
      ? fetchDataPost(api, getToken, user)
      : setError("This field is Required");
  };
  return [{ onChange, handleSubmit, error }];
};

export default useForm;
