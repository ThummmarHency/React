import React from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import FormView from '../Presentation/User/FormView';

const DataLogic = ({text,api,setValues,values,attribute}) => {
  let naviGate = useNavigate();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { ...values };
    const response = await axios.post(
      process.env.REACT_APP_API + `${api}`,
      user
    );
    api==="/users/Login" &&  response.data.statusCode===200?naviGate("/dashboard"):alert(response.data.message);

    api==="/users/Login" &&  localStorage.setItem("token", JSON.stringify(response.data)) ;
    console.log(response.data);
    
  };

  return (
    <div>
       <FormView handleSubmit={handleSubmit} attribute={attribute} values={values} onChange={onChange} text={text}/>
    </div>
  )
}

export default React.memo(DataLogic)