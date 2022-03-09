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
    note: "",
    question: "",
    selectOpt: "Answer...",
    ans1:"",
    ans2:"",
    ans3:"",
    ans4:"",  
  })
  const [questionBank,setquestionBank]=useState({questions:[]})
   
  const getQuestion = (e) => {
    setExam({...exam,[e.target.name]: e.target.value})
  }
    const QuestionSet = [
    { ...FormAttribute[2], name: "question", label: "Question : ", placeholder: "Enter Question",pattern:"^[a-zA-Z0-9]*$"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={exam.ans1} isChecked={exam.selectOpt===exam.ans1} onChange={getQuestion}/>,placeholder:"Ans1",name:"ans1"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={exam.ans2} isChecked={exam.selectOpt===exam.ans2} onChange={getQuestion}/>,placeholder:"Ans2",name:"ans2"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={exam.ans3} isChecked={exam.selectOpt===exam.ans3} onChange={getQuestion}/>,placeholder:"Ans3",name:"ans3"},
    { ...FormAttribute[4],label: <CustomInput type="radio" name="selectOpt" value={exam.ans4} isChecked={exam.selectOpt===exam.ans4} onChange={getQuestion}/>,placeholder:"Ans4",name:"ans4"},
    { ...FormAttribute[2],placeholder: "Enter Notes",label:"Notes : ",name:"note",pattern:"^[a-zA-Z0-9]*$"},
  ]
// console.log("exam",exam);
useEffect(() => {
},[questionBank])
console.log("qb",questionBank);

  const AddQuestion = (e) => {
    // const PushData = () item
      setQuestionNo(questionNo + 1)
      // setExam({subjectName:exam.subjectName,questions:[...exam.questions,{question:exam.question,answer:exam.selectOpt,options:[exam.ans1,exam.ans2,exam.ans3,exam.ans4]}],notes:exam.note });       
      
      setquestionBank({...questionBank,subjectName:exam.subjectName,questions:[...questionBank.questions,{question:exam.question,answer:exam.selectOpt,options:[exam.ans1,exam.ans2,exam.ans3,exam.ans4]}],notes:exam.note });       
      ClearForm()  
      // setquestionBank({...questionBank,exam})

      // setquestionBank({subjectName:exam.subjectName,questions:[...questionBank.questions,{question:exam.question,answer:exam.selectOpt,options:[exam.ans1,exam.ans2,exam.ans3,exam.ans4]}],notes:exam.note });       
    
      // setError(null)
      // }
      // ((Object.values(exam).some(e => e === "")) === false) ? PushData() : setError("This field is Required")
    }


  // const PrevNextQuestion = (No) => { 
  //   setValues({ question: store[No].question, ans1: store[No].options[0], ans2: store[No].options[1],ans3: store[No].options[2],ans4: store[No].options[3]})
  //   setrdoValue({selectOpt:store[No].answer})
  // }

  const ClearForm = () => {
    setExam({
      subjectName:"",
      question: "",
      questions: [],
      ans1:"",
      ans2:"",
      ans3:"",
      ans4:"",
      note:"",
      selectOpt:"Answer..."
    })
    // console.log("gfg",e.target);
    
    // setExam({})
    // setExam((e)=>{
    //   return {...e,subjectName:"",question:"",};
    // })
// setItem({question:"",ans1:""})
// setExam({question:"",ans1:"",
   
//       ans2:"",
//       ans3:"",
//       ans4:"",
//       note:"",
// })
    // setExam({subjectName: "",
    // questions: [],
    // notes: []})
    
  }
const prevQuetion=()=>{
  console.log(questionBank.questions[questionNo-2])
  setExam(
    questionBank.questions.map((a)=>{
      // setExam({[a.target.name]:a.target.value})
      console.log("hjghu",a.answer);
    })
    // {
    //   question: questionBank.questions[questionNo-2].question,
    //   ans1:questionBank.questions[questionNo-2].options[0],
    //   ans2:questionBank.questions[questionNo-2].options[1],
    //   ans3:questionBank.questions[questionNo-2].options[2],
    //   ans4:questionBank.questions[questionNo-2].options[3],
    //   note:questionBank.notes,
    //   selectOpt:questionBank.questions[questionNo-2].answer
    )
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
        <br />
        <br />
        {QuestionSet && <FormView attribute={QuestionSet} error={error} values={exam} onChange={getQuestion} />}
        <CustomInput type="text" name="answer" placeholder="Answer" value={exam.selectOpt} Requirefield={error} readOnly/>
        </>: <h1>exam created</h1>
        }
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
         {questionNo<=15 && 
         <> 
          <CustomButton value="Pre" isDisabled={questionNo !== 1 ? false : true} onClick={()=>{setQuestionNo(questionNo - 1); prevQuetion()}} />
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
