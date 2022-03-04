import React, { useState,useEffect } from "react";
import {attribute} from "../User/SignupUi";
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
import {fetchDataPost,getToken} from '../../Container/DataLogic'
const SubjectList = ["React", "Node js", "Angular", "Ux/Ui"];


const CreateExam = () => {

  const[questionNo,setQuestionNo]= useState(1)
  const[isDisabled,setisDisabled]=useState(false)
  const[Option,setOption]=useState([])
  const[error, setError]= useState(null)
  const[values, setValues]= useState({
    question: "",ans1:"",ans2:"",ans3:"",ans4:"",answer:""
  })

 
  let setQuestions={question:values.question,answer:values.answer,options:[...Option]} 
  const[store,setStore]= useState([setQuestions]) 
  const[exam,setExam]=useState({
    subjectName: "",
    questions:[],
    notes: [
      "10mins exam",
      "start time 10am"
    ]
  })
  
  useEffect(() => {
    setExam({ ...exam, questions: store })

  },[store])

  const QuestionSet=[
    {...attribute[2],name:"question",label:"Question : ",placeholder:"Enter Question"},
    {...attribute[2],label:"Ans1 : ",name:"ans1",placeholder:"Enter Ans1"},
    {...attribute[2],label:"Ans2 : ",name:"ans2",placeholder:"Enter Ans2"},
    {...attribute[2],label:"Ans3 : ",name:"ans3",placeholder:"Enter Ans3"},
    {...attribute[2],label:"Ans4 : ",name:"ans4",placeholder:"Enter Ans4"},
    {...attribute[2],label:"Answer : ",name:"answer",placeholder:"Answer"},
  ]

  const getQuestion=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    setOption([values.ans1,values.ans2,values.ans3,values.ans4])
  }

  // console.log(store);
  
  const NextQuestion=()=>{
    
    const Pushdata=()=>{
      setStore((oldArray) => { return [...oldArray, setQuestions] })
      

      console.log(exam);  
      setQuestionNo(questionNo+1)
      setError(null)
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

  const getSubject=(e)=>{
    setExam({...exam,subjectName:e.target.value})
    setisDisabled(true)
  }

  return(
  <>
  <div className="renderData">

      <h2>Question No : {questionNo}</h2>
    <label>Subject name :</label>
    <select disabled={isDisabled} onChange={getSubject} >
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
     {questionNo <=16? <CustomButton value="add" isDisabled={questionNo<=16 ? false : true} onClick={NextQuestion}/> :<CustomButton value="craete" onClick={()=>fetchDataPost("/dashboard/Teachers/Exam",getToken,exam)}/> }
      {/* <CustomButton value="create" onClick={fetchDataPost("/dashboard/Teachers/Exam",getToken,undefined)}/>  */}

      </div>
    </div>
  </>
  )};

export default CreateExam;
