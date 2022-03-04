import React, { useState }from 'react'
import { useLocation } from 'react-router-dom';
import {FormAttribute} from '../../Container/FormAttribute'

import Reuse from '../../Shared/Reuse';

export const attribute =[
  {...FormAttribute[1],name:"Password",placeholder:"Enter New Password"},
  {...FormAttribute[1],name:"ConfirmPassword",placeholder:"Enter Confirm Password",errorMsg: "password Not match",label: "Confirm Password: "},
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
      <Reuse text="Set" attribute={attribute}  newToken="/users/newPassword" api={`/users/ForgotPassword/Verify?=${token}`} setValues={setValues} values={values}/>
    </div>
  )
}

export default Newpwd