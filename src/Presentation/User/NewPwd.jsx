import React, { useState }from 'react'
import DataLogic from '../../Container/DataLogic';
import { useLocation } from 'react-router-dom';


const Newpwd = () => {
  const location=useLocation()
  let SearchToken = new URLSearchParams(location.search);
  let token=SearchToken.get("token")

  const [values, setValues] = useState({
        password: "",
        ConfirmPassword:""
  });
 
  return (
    <div> 
      <DataLogic value="Set" api={`/users/ForgotPassword/Verify?token=${token}`} setValues={setValues} values={values} obj="newPassword"/>
    </div>
  )
}

export default Newpwd