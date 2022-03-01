import React, { useState } from "react";
import CustomButton from "../../Shared/CustomButton";
import CustomInput from "../../Shared/CustomInput";
import { ExamQue } from "./ExamForm";

const Question = ({subjectValue}) => {
  const [questionNo, setQuestionNo] = useState(1);
  const [error, setError] = useState(null);

  const [option, setOption] = useState(
    {Option1:'',Option2:'',Option3:'',Option4:'',question:'',answer:''}
    );
  
  const [question, setQuestion] = useState(null);

  // const [values, setValues] = useState({
  //   subjectName:subjectValue,
  //   questions:[question],
  // });
  // console.log(values);

  const Question = [
    ExamQue[1],
    ExamQue[2],
    ExamQue[3],
    { ...ExamQue[3], label: "Option 2 : ",name:"Option2", placeholder: "Option 2" },
    { ...ExamQue[3], label: "Option 3 : ",name:"Option3", placeholder: "Option 3" },
    { ...ExamQue[3], label: "Option 4 : ",name:"Option4", placeholder: "Option 4" },
  ];

  const handleValues = (e) => {
    setOption({ ...option, [e.target.name]: e.target.value });
    // setQuestion({ ...question, [e.target.name]: e.target.value });
    // setValues({ ...values, [e.target.name]: e.target.value});
  };
  
  let Que=[]

  const NextQuestion = () => {
    // setQuestion(QuestionArray)
    let OptionArray=[option.Option1,option.Option2,option.Option3,option.Option4]
    let QuestionArray=[{question:option.question,answer:option.answer,options:[...OptionArray]}]
    Que.push(+QuestionArray)
    console.log(Que);
    
    // console.log(option);
  //  setOptions({...options,options:optionArray})
  //  setValues({...values,questions:option})
    questionNo < 15 && setQuestionNo(questionNo + 1);
    setOption({Option1:'',Option2:'',Option3:'',Option4:'',question:'',answer:''}) 
  };
  return (
    <div>
      <h2>Question No : {questionNo}</h2>
      {Question.map((input, index) => {
        return (
          <CustomInput
            key={index}
            {...input}
            Requirefield={error}
            value={option[input.name]}
            onChange={handleValues}
          />
        );
      })}
      <CustomButton
        value={questionNo < 15 ? "Next Question" : "Create Exam"}
        onClick={NextQuestion}
      />
      {/* <DataLogic text="Next Question" api="/dashboard/Teachers/Exam" attribute={Question} setValues={setValues} values={values} /> */}
      <br />
    </div>
  );
};

export default Question;
