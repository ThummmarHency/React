import React, {useState ,useEffect } from "react";
import axios from "axios";
import { token1 } from "./ShowStudentData";
import CustomInput from "../../Shared/CustomInput";
import CustomButton from "../../Shared/CustomButton";
const CreateExam = () => {

    const[]=useState({
        subjectName:"",
        questions:[],
        question:"",
        answer:"",
        options:[]
    })
  useEffect(() => {
    async function fetchData() {
      const res = await axios.post(
        process.env.REACT_APP_API + "/dashboard/Teachers/Exam",

        { headers: { "access-token": `${token1}` } }
      );
      console.log(res.data.data);
    }
    fetchData();
  });

  const formAttribute = [
    {
      label: "Subject Name : ",
      type: "text",
      name: "subjectName",
      placeholder: "Enter Subject Name",
      errorMsg: "it should be a valid Subject name",
      pattern: "^[A-Za-z0-9]$",
    },
    {
      label: "Question : ",
      type: "text",
      name: "question",
      placeholder: "Enter question",
      errorMsg: "it should be a valid Question",
      pattern: "^[A-Za-z0-9]$",
    },
    {
        label: "Answer : ",
        type: "text",
        name: "answer",
        placeholder: "Enter Answer",
      },
      {
        label: "Options : ",
        type: "text",
        name: "options",
        placeholder: "Enter Option",
      },
      
  ];
  return (
    <div className="renderData">
      <h2>Create Exam : </h2>
      {formAttribute.map((input, index) => {
        return (
          <CustomInput
            key={index}
            {...input}
            //   Requirefield={error}
            //   value={values[input.name]}
            //   onChange={onChange}
          />
          );
        })}
        <CustomButton value="Create Exam"/>
    </div>
  );
};

export default CreateExam;
