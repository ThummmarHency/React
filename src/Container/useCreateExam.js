import React, { useEffect, useState } from "react";
import { FormAttribute } from "./FormAttribute";
import { fetchDataPost,fetchDataPut, getToken } from "../Container/DataLogic";

const useCreateExam = ({ exam, setExam,questionNo,setQuestionNo,ids}) => {
  console.log('questionNo', questionNo)
  const SubjectList = ["", "React", "Node js", "Angularr", "Ux/Ui"];
  const [error, setError] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const [notes,setNotes]=useState("");
  const setValueInField = (index) => {
    let clonedExam = { ...exam };
    Object.entries(exam.questions[index]).map(([key, value]) => {
      switch (key) {
        case "options":
          clonedExam.opt1 = value[0];
          clonedExam.opt2 = value[1];
          clonedExam.opt3 = value[2];
          clonedExam.opt4 = value[3];
          break;
        case "question":
          clonedExam.question = value;
          break;
        case "answer":
          clonedExam.selectOpt = value;
          break;
        default:
          break;
      }
    });
    if(typeof clonedExam.notes[index] === 'undefined') {
      clonedExam.note = ""
   }
   else {
    clonedExam.note = clonedExam.notes[index]===" "?"":clonedExam.notes[index];
   }
    setNotes(clonedExam.note)
    setExam(clonedExam);
  };
  console.log('exam : >>', exam)

  useEffect(() => {
    (exam.questions.length === 15 && ids!==null) && setValueInField(questionNo-1);
  }, [exam.questions.length === 15 && ids!==null]);

  useEffect(() => {
    questionNo === 16 && fetchDataPost("/dashboard/Teachers/Exam", getToken, exam);
  }, [questionNo]);

  // useEffect(() => {
  //   questionNo === 16 && fetchDataPut(`dashboard/Teachers/editExam?id=${ids}`, getToken,exam
  //   )
  // },[exam])
  const currentInpVal = {
    question: exam.question,  
    note:"",
    opt1: exam.opt1,
    opt2: exam.opt2,
    opt3: exam.opt3,
    opt4: exam.opt4,
    answer: exam.selectOpt,
  };
  let optionArray = [
    currentInpVal.opt1,
    currentInpVal.opt2,
    currentInpVal.opt3,
    currentInpVal.opt4,
  ];
  const radioBtnAttribute = [
    { value: exam.opt1 },
    { value: exam.opt2 },
    { value: exam.opt3 },
    { value: exam.opt4 },
  ];
 
 
  const getQuestion = (e) => {
    e.target.name === "selectOpt" && e.target.value === ""
      ? alert("First fill field")
      : setExam({ ...exam, [e.target.name]: e.target.value });
    e.target.name==="note" &&  setNotes(e.target.value)
    e.target.name === "subjectName" && setSelectValue(e.target.value);
  };

  const QuestionSet = [
    {
      ...FormAttribute[2],
      name: "question",
      label: "Question : ",
      placeholder: "Enter Question",
      pattern: /^[^ ][A-Za-z0-9_ ]{0,}$/,
      errorMsg: "White space not allow",
    },
  ];
  let setDataInState = {
    subjectName: exam.subjectName,
    questions: [
      ...exam.questions,
      {
        question: exam.question,
        answer: exam.selectOpt,
        options: [exam.opt1, exam.opt2, exam.opt3, exam.opt4],
      },
    ],
    notes: [...exam.notes,exam.note===""? " " :exam.note],
  };
  const sameOptAlert = () => {
    let mapOption = optionArray.map((value) => value === currentInpVal.answer);
    if (optionArray.some((val, i) => optionArray.indexOf(val) !== i)) {
      alert("Question having same options");
    } else {
      if (mapOption.some((isSame) => isSame === true) === false) {
        alert("Answer not match");
      } else {
        return true;
      }
    }
  };

  const AddQuestion = () => {
    const PushData = () => {
      if (sameOptAlert() === true) {
        setError(null);
        setExam(() => setDataInState);
        questionNo <= 15 && setQuestionNo(questionNo + 1);
        questionNo !== 15 && ClearForm();
      }
      setSelectValue(exam.subjectName);
    };
    const updateData = () => {
      if (sameOptAlert() === true) {
        setError(null);
        let updateExam = { ...exam };
        updateExam.questions[questionNo - 1] = {
          question: exam.question,
          answer: exam.selectOpt,
          options: [exam.opt1, exam.opt2, exam.opt3, exam.opt4],
        };
        updateExam.notes[questionNo - 1] = exam.note;
        setExam(updateExam);
        nextQuestion();
        setSelectValue(exam.subjectName);
      }
    };
    let result = Object.values(exam.questions).map((quesValue) => {
      return quesValue.question === currentInpVal.question;
    });
    // Object.values(exam).some((e) => e === "") === false
    (exam.question!=="" && exam.opt1!=="" && exam.opt2!=="" && exam.opt3!=="" && exam.opt4!=="" && exam.selectOpt!=="Answer...")
      ? questionNo < exam.questions.length
        ? result.some((tr) => tr === true) &&
          (exam.questions[questionNo - 1].question ===
            currentInpVal.question) ===
            false
          ? alert("question repeated")
          : updateData()
        : result.some((tr) => tr === true) 
        ? alert("question repeated")
        : PushData()
      : setError("This field is Required");
  };

  const ClearForm = () => {
    setExam({
      ...setDataInState,
      question: "",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
      note: "",
      selectOpt: "Answer...",
    });
    setNotes("")

  };

  const clear = () => {
    const clonedExam = { ...exam };
    clonedExam.question = "";
    clonedExam.opt1 = "";
    clonedExam.opt2 = "";
    clonedExam.opt3 = "";
    clonedExam.opt4 = "";
    clonedExam.note = "";
    clonedExam.selectOpt = "Answer...";
    setExam(clonedExam);
    setError(null);
    setNotes("")
    questionNo === 1 && exam.questions.length !== 1 && setSelectValue("");
  };

  const fieldRequire = (Question) => {
    (exam.question!=="" && exam.opt1!=="" && exam.opt2!=="" && exam.opt3!=="" && exam.opt4!=="" && exam.selectOpt!=="Answer...") ||
    ((questionNo - 1 === exam.questions.length) === true &&
      exam.subjectName === "")
      ? Question()
      : setError(() => "This field is Required");
  };
  const checkUpdation = (index) => {
    const clonedQuestions = {
      question: exam.questions[index].question,
      note: exam.notes[index]===" "?"":exam.notes[index],
      opt1: exam.questions[index].options[0],
      opt2: exam.questions[index].options[1],
      opt3: exam.questions[index].options[2],
      opt4: exam.questions[index].options[3],
      answer: exam.questions[index].answer,
    };
    console.log('clonedQuestions', clonedQuestions)
    if (exam.question!=="" && exam.opt1!=="" && exam.opt2!=="" && exam.opt3!=="" && exam.opt4!=="" && exam.selectOpt!=="Answer...") {
      if (JSON.stringify(currentInpVal) === JSON.stringify(clonedQuestions)) {
        return true;
      }
    } else {
      return false;
    }
  };

  const prevQuestion = () => {
    setError(null);
    let isUpdated = checkUpdation(
      questionNo - 1 === exam.questions.length ? questionNo - 2 : questionNo - 1
    );
    if (isUpdated === true || questionNo - 1 === exam.questions.length) {
      setQuestionNo(() => questionNo - 1);
      setValueInField(questionNo - 2);
    } else {
      alert("first update data");
    }
  };

  const nextQuestion = () => {
    setError(null);
    let isUpdated = checkUpdation(questionNo - 1);
    if (isUpdated === true) {
      questionNo < 15 && setQuestionNo(() => questionNo + 1);
      if (questionNo < exam.questions.length) {
        setValueInField(questionNo);
      } else {
        clear();
      }
    } else {
      alert("First update data");
    }
  };
  return [
    {
      error,
      selectValue,
      QuestionSet,
      SubjectList,
      radioBtnAttribute,
      notes,
      fieldRequire,
      prevQuestion,
      nextQuestion,
      clear,
      getQuestion,
      AddQuestion,
      exam,
    },
  ];
};

export default useCreateExam;
