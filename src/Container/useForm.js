import React, { useState } from "react";
import { NewPwdToken, fetchDataPost } from "./DataLogic";
import { getToken } from "./DataLogic";

const useForm = ({ setValues, values, newToken, api }) => {
  const [error, setError] = useState("");
  const onChange = (e) => {
    return setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log('Object.values((values)=>{return values}', Object.values(values).map((v)=>{return v}))
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    newToken && NewPwdToken(newToken);
    (values  && Object.values(values).some((e) => e === "") === false)
      ? fetchDataPost(api, getToken, user)
      : setError("This field is Required");
  };
  return [{ onChange, handleSubmit, error }];
};

export default useForm;
  