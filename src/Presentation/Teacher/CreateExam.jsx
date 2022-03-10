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
  const [exam, setExam] = useState({
    subjectName: "",
    questions: [],
    notes:[],
    note: "",
    question: "",
    selectOpt: "Answer...",
    Ans1:"",
    Ans2:"",
    Ans3:"",
    Ans4:"",  
  })

   
  const getQuestion = (e) => {
    setExam({...exam,[e.target.name]: e.target.value})
  }
  
  const radioBtnAttribute=[
    {value:exam.Ans1,
      placeholder:"Ans1",
    },
    {value:exam.Ans2,
      placeholder:"Ans2",
   },
    {value:exam.Ans3,
     placeholder:"Ans3",
    },
    {value:exam.Ans4,
      placeholder:"Ans4",
    },
  ]

    const QuestionSet = [
    { ...FormAttribute[2], name: "question", label: "Question : ", placeholder: "Enter Question",pattern:"^[a-zA-Z0-9]*$"},
    { ...FormAttribute[2], placeholder: "Enter Notes",label:"Notes : ",name:"note",pattern:"^[a-zA-Z0-9]*$"},
  ]
  console.log("exam",exam); 

  const AddQuestion = () => {
    const PushData = () =>{
      setError(null)
      setQuestionNo(questionNo + 1)
      setExam({subjectName:exam.subjectName,questions:[...exam.questions,{question:exam.question,answer:exam.selectOpt,options:[exam.Ans1,exam.Ans2,exam.Ans3,exam.Ans4]}], notes:[...exam.notes,exam.note] });       
      questionNo!==15 && ClearForm()  
    }
    console.log(exam.questions[0]);
      const updateData=()=>{

      setExam({...exam,questions:[,...exam.questions,{question:exam.question,answer:exam.selectOpt,options:[exam.Ans1,exam.Ans2,exam.Ans3,exam.Ans4]}],notes:[exam.note]})
    }

        
        // {subjectName:exam.subjectName,questions:[...exam.questions,{question:exam.question,answer:exam.selectOpt,options:[exam.Ans1,exam.Ans2,exam.Ans3,exam.Ans4]}], notes:[...exam.notes,exam.note] };       
          
      
      (exam.selectOpt!=="Answer..." && (Object.values(exam).some(e => e === "")) === false) ? (questionNo<=exam.questions.length? updateData(): PushData()) : setError("This field is Required")

    }

  // const PrevNextQuestion = (No) => { 
  //   setValues({ question: store[No].question, ans1: store[No].options[0], ans2: store[No].options[1],ans3: store[No].options[2],ans4: store[No].options[3]})
  //   setrdoValue({selectOpt:store[No].answer})
  // }

  const ClearForm = () => {
    setExam({
      subjectName:exam.subjectName,
      questions: [...exam.questions,
        { question: exam.question,
          answer: exam.selectOpt,
          options: [exam.Ans1,exam.Ans2,exam.Ans3,exam.Ans4]}
        ],
      notes:[...exam.notes,exam.note],
      question: "",
      Ans1:"",Ans2:"",Ans3:"",Ans4:"",note:"",selectOpt:"Answer..."
    })  
  }
const prevQuetion=()=>{
  setQuestionNo(questionNo - 1);
  console.log("qn",questionNo);
  console.log("exam",exam.questions);
   setExam({...exam,
      question:exam.questions[questionNo-2].question,
      Ans1:exam.questions[questionNo-2].options[0],
      Ans2:exam.questions[questionNo-2].options[1],
      Ans3:exam.questions[questionNo-2].options[2],
      Ans4:exam.questions[questionNo-2].options[3],
      note:exam.notes[questionNo-2],
      selectOpt:exam.questions[questionNo-2].answer
   })
  }
const nextQuestion=()=>{
  console.log(exam);
  setQuestionNo(questionNo + 1)
  setExam({
    question: exam.questions[questionNo].question,
    Ans1:exam.questions[questionNo].options[0],
    Ans2:exam.questions[questionNo].options[1],
    Ans3:exam.questions[questionNo].options[2],
    Ans4:exam.questions[questionNo].options[3],
    note:exam.notes[questionNo],
    selectOpt:exam.questions[questionNo].answer
 })

}
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
        {(questionNo===1 && exam.subjectName==="") && <label className="requireMsg">{error}</label>}
        <br />
        <br />
        {QuestionSet && <FormView attribute={QuestionSet} error={error} values={exam} onChange={getQuestion} />}
        {radioBtnAttribute.map((e,index)=>{
       return(
       <div key={index}>
         {
         <CustomInput label={<CustomInput type="radio" name="selectOpt" value={e.value} isChecked={exam.selectOpt===e.value} onChange={getQuestion}/>} Requirefield={error} value={e.value} onChange={getQuestion} placeholder={e.placeholder} name={e.placeholder} />  }
       </div>
    )})}
        <CustomInput type="text" name="answer" placeholder="Answer" value={exam.selectOpt} Requirefield={error} readOnly/>
        </>: <h1>exam created</h1>
        }
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
         {questionNo<=15 && 
         <> 
          <CustomButton value="Pre" isDisabled={questionNo !==1 ? false : true} onClick={()=>{ prevQuetion()}} />
          <CustomButton value="next" isDisabled={questionNo!==15 ?false:true} onClick={()=>{ nextQuestion()}} />
          <CustomButton value="Clear" onClick={ClearForm} />
          </> }
         <CustomButton value={questionNo<=exam.questions.length ? "update":"add"} onClick={AddQuestion} /> 
         {questionNo === 16 && <CustomButton value="create exam" onClick={() => fetchDataPost("/dashboard/Teachers/Exam", getToken, exam)} />}

        </div>
      </div>
    </>
  )
};

export default CreateExam;


// function signupUser() {
//   return new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   });
// }

// const initialState = {
//   username: "",
//   email: "",
//   password: "",
//   passwordConfirmation: ""
// };

// const CreateExam = () => {
//   const [{ username, email, password, passwordConfirmation },setState] = useState(initialState);

//   const clearState = () => {
//     setState({ ...initialState });
//   };

//   const onChange = e => {
//     const { name, value } = e.target;
//     setState(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log(username, email, password, passwordConfirmation );
//     signupUser().then(clearState);
//   };

//   return (
//     <div className="renderData">
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Username:
//           <input value={username} name="username" onChange={onChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Email:
//           <input value={email} name="email" onChange={onChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Password:
//           <input
//             value={password}
//             name="password"
//             type="password"
//             onChange={onChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Confirm Password:
//           <input
//             value={passwordConfirmation}
//             name="passwordConfirmation"
//             type="password"
//             onChange={onChange}
//           />
//         </label>
//       </div>
//       <button>Submit</button>
//     </form>
//     </div>
//   );
// };
// export default CreateExam;
