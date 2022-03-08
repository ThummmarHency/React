import React,{useState, useEffect} from "react";
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
import { fetchDataPost, getToken } from '../../Container/DataLogic'
import CustomInput from "../../Shared/CustomInput";
import useCreateExam from "../../Container/useCreateExam"
import {FormAttribute} from '../../Container/FormAttribute'

const SubjectList = ["","React", "Node js", "Angular", "Ux/Ui"];

const CreateExam = () => {
  // const [{isDisabled,error,store,questionNo,setQuestionNo,QuestionSet,rdoValue,getQuestion,AddQuestion,ClearForm,values,PrevNextQuestion,getSubject,exam}]=useCreateExam()
  const [error, setError] = useState(null)
  
  const [questionNo, setQuestionNo] = useState(1)
  const [item,setitem]=useState({})
  const [exam, setExam] = useState({
    subjectName: "",
    questions: [
        {question: "",
         answer: "",
         options: []}
    ],
    notes: []
  })
  // const[exam,setExam]=useState([])
    useEffect(() => {
      setExam({ ...exam, subjectName:item.subjectName,questions:[{ question:item.question,answer:exam.questions[questionNo-1].answer,options:[item.ans1,item.ans2,item.ans3,item.ans4]}],notes:[item.notes] });  
    },[item])

  const getValue=(e)=>{
    setExam({ ...exam, subjectName:item.subjectName,questions:[{ question:item.question,answer:e.target.value,options:[item.ans1,item.ans2,item.ans3,item.ans4]}],notes:[item.notes] });  
    // setitem({...item,answer:e.target.value})
  }
  const QuestionSet = [
    { ...FormAttribute[2], name: "question", label: "Question : ", placeholder: "Enter Question",pattern:"^[a-zA-Z0-9]*$"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={item.ans1} isChecked={item.answer===item.ans1} onChange={getValue}/>,placeholder:"Ans1",name:"ans1"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={item.ans2} isChecked={item.answer===item.ans2} onChange={getValue}/>,placeholder:"Ans2",name:"ans2"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={item.ans3} isChecked={item.answer===item.ans3} onChange={getValue}/>,placeholder:"Ans3",name:"ans3"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={item.ans4} isChecked={item.answer===item.ans4} onChange={getValue}/>,placeholder:"Ans4",name:"ans4"},
    { ...FormAttribute[2],placeholder: "Enter Notes",label:"Notes : ",name:"notes",pattern:"^[a-zA-Z0-9]*$"},
  ]

  const getQuestion = (e) => {
    setitem({...item,[e.target.name]: e.target.value})
  }
  // console.log(item);
  // console.log("exam",item);
  
  const AddQuestion = (e) => {
    // const PushData = () => {
      setQuestionNo(questionNo + 1)
      setExam({...exam,subjectName:item.subjectName,questions:[...exam.questions,{question:item.question,answer:"hgf",options:[item.ans1,item.ans2,item.ans3,item.ans4]}],notes:item.notes });       
      ClearForm()
      // setError(null)
      // }
      // ((Object.values(exam).some(e => e === "")) === false) ? PushData() : setError("This field is Required")
    }
    console.log("exam  ",exam);


//   const PrevNextQuestion = (No) => { 
//     setValues({ question: store[No].question, ans1: store[No].options[0], ans2: store[No].options[1],ans3: store[No].options[2],ans4: store[No].options[3]})
//     setrdoValue({selectOpt:store[No].answer})
//   }

  const ClearForm = () => {
    
    // setExam({
    //   question: "",
    //   ans1:"",
    //   ans2:"",
    //   ans3:"",
    //   ans4:"",
    //   notes:"",
    // })
    setitem(
    {question: "",
    ans1:"",
    ans2:"",
    ans3:"",
    ans4:"",
    notes:""})  
  }

  // const getSubject = (e) => {
  //   setExam({ ...exam, subjectName: e.target.value })
  //   setisDisabled(true)
  // }
  return (
    <>
      <div className="renderData">

   
      {questionNo<=15 ? 
      <>
        <h2>Question No : {questionNo}</h2>
        <label>Select Subject : </label>
        <select disabled={questionNo===1?false:true} onChange={getQuestion} name="subjectName">
          {SubjectList.map((SubName, index) => {
            return <option key={index} value={SubName}>{SubName}</option>
          })}
        </select>
        <br />
        <br />
        {QuestionSet && <FormView attribute={QuestionSet} error={error} values={exam} onChange={getQuestion} />}
        <CustomInput type="text" name="answer" placeholder="Answer" value={exam.questions[questionNo-1].answer} Requirefield={error} readOnly/>
        </>: <h1>exam created</h1>
        }
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
         {questionNo<=15 && 
         <> 
          <CustomButton value="Pre" isDisabled={questionNo !== 1 ? false : true} onClick={()=>{setQuestionNo(questionNo - 1);}} />
          <CustomButton value="next" isDisabled={questionNo!==15 ?false:true} onClick={()=>{setQuestionNo(questionNo + 1); }} />
          <CustomButton value="Clear" onClick={ClearForm} />
          </> }
         <CustomButton value="add" onClick={AddQuestion} /> 
         {questionNo === 16 && <CustomButton value="create exam" onClick={() => fetchDataPost("/dashboard/Teachers/Exam", getToken, exam)} />}

        </div>
      </div>
    </>
  )
};

export default CreateExam;
