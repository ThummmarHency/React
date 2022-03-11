import React,{ useState, useEffect} from 'react'
import CustomInput from "../Shared/CustomInput";
import {FormAttribute} from './FormAttribute'

const useCreateExam = () => {
  const [error, setError] = useState(null)
  const [rdoValue, setrdoValue] = useState({selectOpt:"Answer..."})
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

  useEffect(() => {
    setOption([values.ans1, values.ans2, values.ans3, values.ans4])
  }, [values])

  const getRdoValue=(e)=>{
    const { name, value } = e.target;
    setrdoValue({[name]:value})
    
  }

  // const QuestionSet = [
  //   { ...FormAttribute[2], name: "question", label: "Question : ", placeholder: "Enter Question",pattern:"^[a-zA-Z0-9]*$"},
  //   { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans1} isChecked={rdoValue.selectOpt===values.ans1} onChange={getRdoValue}/>, name: "ans1", placeholder: "Enter Ans1",pattern:"^[a-zA-Z0-9]*$" },
  //   { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans2} isChecked={rdoValue.selectOpt===values.ans2} onChange={getRdoValue}/>, name: "ans2", placeholder: "Enter Ans2",pattern:"^[a-zA-Z0-9]*$" },
  //   { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans3} isChecked={rdoValue.selectOpt===values.ans3} onChange={getRdoValue}/>, name: "ans3", placeholder: "Enter Ans3",pattern:"^[a-zA-Z0-9]*$" },
  //   { ...FormAttribute[2], label: <CustomInput type="radio" name="selectOpt" value={values.ans4} isChecked={rdoValue.selectOpt===values.ans4} onChange={getRdoValue}/>, name: "ans4", placeholder: "Enter Ans4",pattern:"^[a-zA-Z0-9]*$" },
  // ]

  const getQuestion = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });  
  }

  console.log("exam",exam);
  const AddQuestion = () => {

      const PushData = () => {
      setStore([...store, setQuestions])
      setQuestionNo(questionNo + 1)
      setError(null)
      ClearForm()
    }
    ((rdoValue.selectOpt!=="Answer..." && (Object.values(values).some(e => e === "")) === false)) ? PushData() : setError("This field is Required")
}
  const PrevNextQuestion = (No) => { 
    setValues({ question: store[No].question, ans1: store[No].options[0], ans2: store[No].options[1],ans3: store[No].options[2],ans4: store[No].options[3]})
    setrdoValue({selectOpt:store[No].answer})
  }

  const ClearForm = () => {
    setValues({ question: "", ans1: "", ans2: "", ans3: "", ans4: ""})
    setrdoValue({selectOpt:"Answer..."})
  }

  const getSubject = (e) => {
    setExam({ ...exam, subjectName: e.target.value })
    setisDisabled(true)
  }

  return [{isDisabled,store,error,questionNo,setQuestionNo,rdoValue,getQuestion,AddQuestion,ClearForm,values,PrevNextQuestion,getSubject,exam}]
}

export default useCreateExam