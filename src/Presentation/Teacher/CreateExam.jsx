import React, {useState} from "react";
import CustomInput from "../../Shared/CustomInput";
import {ExamQue} from './ExamForm'
import Question from "./Question";

export const formAttribute = [ 
  ExamQue[0],
];

const CreateExam = () => {
  const[values, setValues]=useState({
    subjectName:""
  })

  const handleValues=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    
  } 
  return (
    <>    <div className="renderData">
      <h2>Create Exam : </h2>
      
       {formAttribute.map((input, index) => {
      return (
        <CustomInput
          key={index}
          {...input}
          // Requirefield={error}
          value={values[input.name]}
          onChange={handleValues}
        />
      );
    })}
    </div>
      <div className="Questionrender"> <Question subjectValue={values.subjectName}/></div>
      </>

  );
};

export default CreateExam;
