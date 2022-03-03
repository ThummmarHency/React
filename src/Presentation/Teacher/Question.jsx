import React, { useState } from "react";
import DataLogic from "../../Container/DataLogic";
import CustomButton from "../../Shared/CustomButton";
import CustomInput from "../../Shared/CustomInput";
import { ExamQue } from "./ExamForm";

const Question = ({ subjectValue }) => {
  // console.log(subjectValue);
  const [questionNo, setQuestionNo] = useState(1);
  const [error, setError] = useState(null);
  const [option, setOption] = useState(
    { Option1: '', Option2: '', Option3: '', Option4: '', question: '', answer: '' }
  );
  const [store, setStore] = useState([])
  const [exam, setExam] = useState({
    subjectName: subjectValue,
    questions: [],
    notes: [
      "10mins exam",
      "start time 10am"
    ]
  })

  const Question = [
    ExamQue[1],
    ExamQue[2],
    ExamQue[3],
    { ...ExamQue[3], label: "Option 2 : ", name: "Option2", placeholder: "Option 2" },
    { ...ExamQue[3], label: "Option 3 : ", name: "Option3", placeholder: "Option 3" },
    { ...ExamQue[3], label: "Option 4 : ", name: "Option4", placeholder: "Option 4" },
  ];

  const handleValues = (e) => {
    setOption({ ...option, [e.target.name]: e.target.value });
  };

  const NextQuestion = () => {
    let setOptionArray = [option.Option1, option.Option2, option.Option3, option.Option4]
    let setQuestionArray = { question: option.question, answer: option.answer, options: [...setOptionArray] }

    const setQuestion = () => {
      setError(null)
      setStore((oldArray) => { return [...oldArray, setQuestionArray] })
      setExam({ ...exam, questions: store })
      questionNo <= 16 && setQuestionNo(questionNo + 1);
      setOption({ Option1: '', Option2: '', Option3: '', Option4: '', question: '', answer: '' })
    }
    Object.values(option).some(e => e === "") === false ? setQuestion() : setError("This field is Required")
    console.log("jfg", exam);

  };
  return (
    <div>
      {questionNo <= 16 &&
        <>
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
        </>}
      {questionNo <= 16 ? <CustomButton
        value="Next Question"
        onClick={NextQuestion}
      /> :
        <DataLogic text="Create Exam" api="/dashboard/Teachers/Exam" values={exam} setValues={setExam} />}
      <br />
    </div>
  )
};

export default Question;
