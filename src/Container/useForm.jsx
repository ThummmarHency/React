import React, { useState } from "react";
import { NewPwdToken, fetchDataPost } from "./DataLogic";
import { getToken } from "../Container/DataLogic";

const useForm = ({ setValues, values, newToken, api }) => {
  const [error, seterror] = useState("");

  const onChange = (e) => {
    return setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    newToken && NewPwdToken(newToken);
    values && Object.values(values).some((e) => e === "") === false
      ? fetchDataPost(api, getToken, user)
      : seterror("This field is Required");
  };
  return [{ onChange, handleSubmit, error }];
};

export default useForm;
