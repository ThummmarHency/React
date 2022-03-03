import React, { useState } from "react";
import CustomInput from "../../Shared/CustomInput";
import {attribute} from "../User/SignupUi";
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
const SubjectList = ["React", "Node js", "Angular", "Ux/Ui"];


const CreateExam = () => {

  const[questionNo,setQuestionNo]= useState(1)
  const[error, setError]= useState(null)
  const[values, setValues]= useState({
    question: "",ans1:"",ans2:"",ans3:"",ans4:"",answer:""
  })

  // const[option,setOption]= useState([])
  // const[questions,setQuestions]= useState([])
  let setOption=[values.ans1,values.ans2,values.ans3,values.ans4]
  let setQuestions={question:values.question,answer:values.answer,options:[...setOption]} 

  const[store,setStore]= useState([setQuestions])
  const getQuestion=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const QuestionSet=[
    {...attribute[2],name:"question",label:"Question : ",placeholder:"Enter Question"},
    {...attribute[2],label:"Ans1 : ",name:"ans1",placeholder:"Enter Ans1"},
    {...attribute[2],label:"Ans2 : ",name:"ans2",placeholder:"Enter Ans2"},
    {...attribute[2],label:"Ans3 : ",name:"ans3",placeholder:"Enter Ans3"},
    {...attribute[2],label:"Ans4 : ",name:"ans4",placeholder:"Enter Ans4"},
    {...attribute[2],label:"Answer : ",name:"answer",placeholder:"Answer"},
  ]
  const NextQuestion=()=>{
    
    
    const Pushdata=()=>{
      setError(null)
      setStore((oldArray) => { return [...oldArray, setQuestions] })
      
      console.log(store);  
      
      setQuestionNo(questionNo+1)
    }
    (Object.values(values).some(e => e === "")) === false ? Pushdata() : setError("This field is Required")
     ClearForm()
  }
  const PrevQuestion=()=>{
    setQuestionNo(questionNo-1)
  }
  const ClearForm=()=>{
    setValues({ question: "",ans1:"",ans2:"",ans3:"",ans4:"",answer:""})
  }
  return(
  <>
  <div className="renderData">

      <h2>Question No : {questionNo}</h2>
    <label>Subject name :</label>
    <select>
      {SubjectList.map((SubName,index) => {
       return <option key={index} value={SubName}>{SubName}</option>
      })}
    </select>
    <br />
    <br />
   {QuestionSet && <FormView attribute={QuestionSet} error={error}  values={values} onChange={getQuestion}/>  }
    <br />
      {/* <CustomInput placeholder="Answer"/> */}
      <br />
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <CustomButton value="Pre" isDisabled={questionNo!==1 ? false : true} onClick={PrevQuestion}/>
      <CustomButton value="next"/>
      <CustomButton value="Clear" onClick={ClearForm}/>
      <CustomButton value="add" isDisabled={questionNo<15 ? false : true} onClick={NextQuestion}/>
      </div>
    </div>
  </>
  )};

export default CreateExam;
