import React,{ useState} from 'react'
import Datalogic from '../../Container/DataLogic'

const ForgotPwd = () => {
    const [values, setValues] = useState({
        email: "",
      });
    
  return (
    <div>
      <Datalogic value="Send" api="/users/ForgotPassword" setValues={setValues} values={values} obj="forgotPwd"/>

    </div>
  )
}

export default ForgotPwd