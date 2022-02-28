import React,{ useState} from 'react'
import Datalogic from '../../Container/DataLogic'
import {formattribute} from '../User/LoginUi'

export const attribute =[
  formattribute[0]
]
const ForgotPwd = () => {
    const [values, setValues] = useState({
        email: "",
      });
  
  return (
    <div>
      <Datalogic text="Send" api="/users/ForgotPassword" attribute={attribute} setValues={setValues} values={values} obj="forgotPwd"/>

    </div>
  )
}

export default ForgotPwd