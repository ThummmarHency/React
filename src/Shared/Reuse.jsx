import React from "react";
import FormView from "../Presentation/User/FormView";
import useForm from '../Container/useForm'
const Reuse = ({ text, api, setValues, values, newToken, attribute }) => {

  const [{onChange,handleSubmit,error}]= useForm({setValues,values,newToken,api})
  
  return (
    <div>
      <FormView
        handleSubmit={handleSubmit}
        attribute={attribute}
        error={error}
        values={values}
        onChange={onChange}
        text={text}
      />
    </div>
  );
};

export default React.memo(Reuse);
