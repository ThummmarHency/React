import React,{ useState} from 'react'
import Reuse from '../../Shared/Reuse'
import {FormAttribute} from '../../Container/FormAttribute'

export const attribute =[
  FormAttribute[0]
]
const ForgotPwd = () => {
    const [values, setValues] = useState({
        email: "",
      });
  
  return (
    <div>
      <Reuse text="Send" api="/users/ForgotPassword" attribute={attribute} setValues={setValues} values={values} />
    </div>
  )
}

export default ForgotPwd