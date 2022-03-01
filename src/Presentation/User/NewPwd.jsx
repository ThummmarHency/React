import React, { useState }from 'react'
import DataLogic from '../../Container/DataLogic';
import { useLocation } from 'react-router-dom';
import {formattribute} from '../User/LoginUi'

export const attribute =[
 {...formattribute[1],name:"Password",placeholder:"Enter New Password"},
  {
    label: "Confirm Password: ",
    type: "password",
    name: "ConfirmPassword",
    placeholder: "Enter Confirm Password",
    errorMsg: "password Not match",
    pattern:"^[A-Za-z0-9]{3,16}$"
  },
]
const Newpwd = () => {
  const location=useLocation()
  let SearchToken = new URLSearchParams(location.search);
  let token=SearchToken.get("token")

  const [values, setValues] = useState({
        Password: "",
        ConfirmPassword:""
  });
 
  return (
    <div> 
      <DataLogic text="Set" attribute={attribute}  newToken="/users/newPassword" api={`/users/ForgotPassword/Verify?=${token}`} setValues={setValues} values={values}/>
    </div>
  )
}

export default Newpwd