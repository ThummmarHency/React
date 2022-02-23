import React,{ useState} from 'react'
import axios from "axios";
import LoginSignup from '../Presentation/LoginSignup';
import CustomInput from '../Shared/CustomInput';

const Loginlogic = ({value,loginApi,obj}) => {
    const gettoken=localStorage.getItem('token')
    
    const [input, setinput] = useState(null);

    const onChange = (e) => {
        const { value, name } = e.target;
        setinput((prev) => {
          
          return { ...prev, [name]: value };
        });
      };
      
       const Login = async (e) => {
          e.preventDefault();
          const user = { ...input };
          console.log(input);
        
           const response = await axios.post(
             process.env.REACT_APP_API+`${loginApi}`,
           user
          )
          localStorage.setItem('token',JSON.stringify(response.data))
          console.log(response.data)}
        

  return (
    <div>
        <LoginSignup Login={Login} onChange={onChange} value1={value} obj={obj}/>
    </div>
  )
}

export default Loginlogic