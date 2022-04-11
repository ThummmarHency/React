import React, { useState, useEffect } from "react";
import { NewPwdToken, fetchDataPost } from "./DataLogic";
import { FormAttribute } from "../Container/FormAttribute";
import { getToken } from "./DataLogic";

const useForm = ({ setValues, values, newToken, api }) => {
  var pv = Object.values(FormAttribute).map((e) => {
    return { [e.name]: e.pattern };
  });
  const [error, setError] = useState("");
  const isError=localStorage.getItem("error")
  // console.log('isError',  isError)
  useEffect(() => {
  },[values])
  
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    
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
