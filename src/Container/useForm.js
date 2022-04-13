import React, { useState} from "react";
import { NewPwdToken, fetchDataPost } from "./DataLogic";
import { getToken } from "./DataLogic";

const useForm = ({ setValues, values, newToken, api }) => {
  const [formErrors, setFormErrors]= useState({})
  const [error, setError] = useState("");
  const checkValidation = (name, value, formErrors, setFormErrors,formValues) => {
    let errors = formErrors;
  
    if (name === "name") {
      const name = value;
      if (!name) {
        formErrors.name = true;
      } else if (name.length < 3) {
        formErrors.name = true;
      } else {
        formErrors.name = "";
      }
    }
    const emailReg =
    /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    if (name === "email") {
      const email = value;
      if (email === "") {
        formErrors.email = true;
      } else if (!email.match(emailReg)) {
        formErrors.email = true;
      } else {
        formErrors.email = "";
      }
    }
  
    if (name === "password") {
      const password = value;
      if (!password) {
        formErrors.password = true;
      } else if (password.length <= 6) {
        formErrors.password = true;
      } else if (password.length >= 15) {
        formErrors.password = true;
      } else {
        formErrors.password = "";
      }
    }
    if (name === "oldPassword") {
      const oldPassword = value;
      if (!oldPassword) {
        formErrors.oldPassword = true;
      } else if (oldPassword.length <= 6) {
        formErrors.oldPassword = true;
      } else if (oldPassword.length >= 15) {
        formErrors.oldPassword = true;
      } else {
        formErrors.oldPassword = "";
      }
    }
    if (name === "role") {
      const role = value;
      if (!role) {
        formErrors.role = true;
      } else {
        formErrors.role = "";
      }
    }
  
    if(name === "Password"){
      const Password = value;
      if (!Password) {
        formErrors.Password = true;
      } else if (Password.length <= 6) {
        formErrors.Password = true;
      } else if (Password.length >= 15) {
        formErrors.Password = true;
      } else {
        formErrors.Password = "";
      }
    }
    if(name === "ConfirmPassword"){
      const ConfirmPassword = value;
      if (!ConfirmPassword) {
        formErrors.ConfirmPassword = true;
      } else if (ConfirmPassword.length <= 6) {
        formErrors.ConfirmPassword = true;
      } else if (ConfirmPassword.length >= 15) {
        formErrors.ConfirmPassword = true;
      } else {
        formErrors.ConfirmPassword = "";
      }
    }
    return setFormErrors(errors);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    checkValidation(e.target.name,e.target.value,formErrors, setFormErrors)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    newToken && NewPwdToken(newToken);
    Object.values(values).some((e) => e === "") === false
      ? Object.values(formErrors).every((value)=>value==="")===true && fetchDataPost(api, getToken, user)
      : setError("This field is Required");
  };
  return [{ onChange, handleSubmit, error }];
};

export default useForm;
