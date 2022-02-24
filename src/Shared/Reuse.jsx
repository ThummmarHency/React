/* eslint-disable import/no-anonymous-default-export */

export default [
  {
    id: 1,
    label: "Name : ",
    type: "text",
    name: "name",
    placeholder: "Enter name",
    errorMsg: "Name should be 3-16 character and shouldn't include any special character",
    pattern:"^[A-Za-z0-9]{3,16}$",
    signup: "signUp",
    required:true,
  },
  {
    id: 2,
    label: "Email : ",
    type: "email",
    name: "email",
    placeholder: "Enter Your email",
    required:true,
    errorMsg: "it should be a valid email address",
    signup: "signUp",
    login: "login",
    forgotpwd:"forgotPwd"
  },
  {
    id: 3,
    label: "Password : ",
    type: "password",
    name: "password",
    placeholder: "Enter password",
    required:true,
    errorMsg: "password should be 8-16 characters long",
    pattern:"^[0-9]{8,20}$",
    signup: "signUp",
    login: "login",
    newpassword :"newPassword"
  },
  {
    id: 4,
    label: "Confirm Password : ",
    type: "password",
    name: "ConfirmPassword",
    placeholder: "Enter Confirm Password",
    required:true,
    errorMsg: "password not match",
    pattern:"^[0-9]{8,16}$",
    newpassword :"newPassword"

  },
  {
    id: 5,
    label: "Role : ",
    type: "text",
    name: "role",
    placeholder: "student/teacher",
    required:true,
    errorMsg: "Role should be either student or teacher ",
    pattern:"^student|teacher$",
    signup: "signUp",
  },
];
