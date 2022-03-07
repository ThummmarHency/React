import React, { useState, useEffect } from "react";
import {FormAttribute} from '../../Container/FormAttribute'
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
import { fetchDataPost, getToken } from '../../Container/DataLogic'
import CustomInput from "../../Shared/CustomInput";
const SubjectList = ["","React", "Node js", "Angular", "Ux/Ui"];

const CreateExam = () => {

  const [error, setError] = useState(null)
  const [rdoValue, setrdoValue] = useState({selectOpt:""})
  const [uncheck, setunCheck] = useState(null)
  const [values, setValues] = useState({
    question: "", ans1: "", ans2: "", ans3: "", ans4: ""
  })
  const [isDisabled, setisDisabled] = useState(false)
  const [questionNo, setQuestionNo] = useState(1)
  const [Option, setOption] = useState([])
 
  let setQuestions = { question: values.question, answer: rdoValue.selectOpt, options: [...Option] }
  const [store, setStore] = useState([])
  const [exam, setExam] = useState({
    subjectName: "",
    questions: [],
    notes: [
      "10mins exam",
      "start time 10am"
    ]
  })

  useEffect(() => {
    setExam({ ...exam, questions: store })
  }, [store])

  const getRdoValue=(e)=>{
    const { name, value } = e.target;
    setrdoValue({[name]:value})
  }

  const QuestionSet = [
    { ...FormAttribute[2], name: "question", label: "Question : ", placeholder: "Enter Question",pattern:"^[a-zA-Z0-9]*$"},
    { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans1} checked={uncheck===values} onChange={getRdoValue}/>, name: "ans1", placeholder: "Enter Ans1",pattern:"^[a-zA-Z0-9]*$" },
    { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans2} checked={uncheck} onChange={getRdoValue}/>, name: "ans2", placeholder: "Enter Ans2",pattern:"^[a-zA-Z0-9]*$" },
    { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans3} checked={uncheck} onChange={getRdoValue}/>, name: "ans3", placeholder: "Enter Ans3",pattern:"^[a-zA-Z0-9]*$" },
    { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans4} checked={uncheck} onChange={getRdoValue}/>, name: "ans4", placeholder: "Enter Ans4",pattern:"^[a-zA-Z0-9]*$" },
  ]

  const getQuestion = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setOption([values.ans1, values.ans2, values.ans3, values.ans4])
  }

  console.log(exam);
  const AddQuestion = () => {

    const PushData = () => {
      setStore([...store, setQuestions])
      setQuestionNo(questionNo + 1)
      setError(null)
      ClearForm()
    }
    // console.log(values);
   (rdoValue.selectOpt!=="" && (Object.values(values).some(e => e === "")) === false) ? PushData() : setError("This field is Required")
  }
  const PrevQuestion = () => {
    setQuestionNo(questionNo - 1)
    console.log(store[questionNo-2]);
    setValues({ question: store[questionNo-2].question, ans1: store[questionNo-2].options[0], ans2: store[questionNo-2].options[1], ans3: store[questionNo-2].options[2], ans4: store[questionNo-2].options[3]})
    setrdoValue({selectOpt:store[questionNo-2].answer})
  }

  const NextQuestion = () => {
    setQuestionNo(questionNo + 1)
    setValues({ question: store[questionNo].question, ans1: store[questionNo].options[0], ans2: store[questionNo].options[1], ans3: store[questionNo].options[2], ans4: store[questionNo].options[3] }) 
  }

  const ClearForm = () => {
    setValues({ question: "", ans1: "", ans2: "", ans3: "", ans4: ""})
    setrdoValue({selectOpt:""})
    setunCheck(null)
  }

  const getSubject = (e) => {
    setExam({ ...exam, subjectName: e.target.value })
    setisDisabled(true)
  }

  return (
    <>
      <div className="renderData">
      {questionNo!==16 && 
      <>
        <h2>Question No : {questionNo}</h2>
        <label>Select Subject : </label>
        <select disabled={isDisabled} onChange={getSubject} >
          {SubjectList.map((SubName, index) => {
            return <option key={index} value={SubName}>{SubName}</option>
          })}
        </select>
        <br />
        <br />
        {QuestionSet && <FormView attribute={QuestionSet} error={error} values={values} onChange={getQuestion} />}
        </>}
        <CustomInput type="text" placeholder="Answer" name="answer" value={rdoValue.selectOpt} Requirefield={error} readOnly/>

        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CustomButton value="Pre" isDisabled={questionNo !== 1 ? false : true} onClick={PrevQuestion} />
          <CustomButton value="next" isDisabled={questionNo!==15 ?false:true} onClick={NextQuestion} />
          <CustomButton value="Clear" onClick={ClearForm} />
          <CustomButton value="add" isDisabled={questionNo!==16?false:true} onClick={AddQuestion} />  
         {questionNo === 16 && <CustomButton value="create exam" onClick={() => fetchDataPost("/dashboard/Teachers/Exam", getToken, exam)} />}

        </div>
      </div>
    </>
  )
};

export default CreateExam;
