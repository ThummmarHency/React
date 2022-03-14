import React, { useState, useEffect } from "react";
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
import { fetchDataPost, getToken } from "../../Container/DataLogic";
import CustomInput from "../../Shared/CustomInput";
import useCreateExam from "../../Container/useCreateExam";
import { FormAttribute } from "../../Container/FormAttribute";

const SubjectList = ["", "React", "Node js", "Angular", "Ux/Ui"];

const CreateExam = () => {
  // const [{isDisabled,error,store,questionNo,setQuestionNo,QuestionSet,rdoValue,getQuestion,AddQuestion,ClearForm,values,PrevNextQuestion,getSubject,exam}]=useCreateExam()
  const [error, setError] = useState(null);

  const [questionNo, setQuestionNo] = useState(1);
  const [exam, setExam] = useState({
    subjectName: "",
    questions: [],
    notes: [],
    note: "",
    question: "",
    selectOpt: "Answer...",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
  });

  const getQuestion = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const radioBtnAttribute = [
    { value: exam.opt1, placeholder: "Option1", name: "opt1" },
    { value: exam.opt2, placeholder: "Option2", name: "opt2" },
    { value: exam.opt3, placeholder: "Option3", name: "opt3" },
    { value: exam.opt4, placeholder: "Option4", name: "opt4" },
  ];

  const QuestionSet = [
    {
      ...FormAttribute[2],
      name: "question",
      label: "Question : ",
      placeholder: "Enter Question",
      pattern: "^[a-zA-Z0-9]*$",
    },
    {
      ...FormAttribute[2],
      placeholder: "Enter Notes",
      label: "Notes : ",
      name: "note",
      pattern: "^[a-zA-Z0-9]*$",
    },
  ];
  console.log("exam", exam);

  const AddQuestion = () => {
    const PushData = () => {
      setError(null);
      setQuestionNo(questionNo + 1);
      let clonedExam={...exam}
      clonedExam.subjectName=exam.subjectName;
      clonedExam.questions=[...exam.questions,
        {
          question: exam.question,
          answer: exam.selectOpt,
          options: [exam.opt1, exam.opt2, exam.opt3, exam.opt4],
        }]
        clonedExam.notes=[...exam.notes, exam.note]
        setExam(clonedExam)
        questionNo !== 15 && ClearForm();
    };

    const updateData = () => {
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
    };

    exam.selectOpt !== "Answer..." &&
    Object.values(exam).some((e) => e === "") === false
      ? questionNo <= exam.questions.length
        ? updateData()
        : PushData()
      : setError("This field is Required");
  };

  const ClearForm = () => {
    setExam({
      subjectName: exam.subjectName,
      questions: [
        ...exam.questions,
        {
          question: exam.question,
          answer: exam.selectOpt,
          options: [exam.opt1, exam.opt2, exam.opt3, exam.opt4],
        },
      ],
      notes: [...exam.notes, exam.note],
      question: "",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
      note: "",
      selectOpt: "Answer...",
    });
  };

  const clear = () => {
    const clonedExam = { ...exam };
    console.log('clonedExam :>> ', clonedExam);
    clonedExam.question = "";
    clonedExam.opt1 = "";
    clonedExam.opt2 = "";
    clonedExam.opt3 = "";
    clonedExam.opt4 = "";
    clonedExam.note = "";
    clonedExam.selectOpt = "Answer...";
    setExam(clonedExam);
  };

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
    clonedExam.note = clonedExam.notes[index];
    setExam(clonedExam);
  };

  const currentInpVal = {
    question: exam.question,
    opt1: exam.opt1,
    opt2: exam.opt2,
    opt3: exam.opt3,
    opt4: exam.opt4,
    note: exam.note,
    answer: exam.selectOpt,
  };
  console.log('currentInpVal :>> ', currentInpVal);
  const checkUpdation=()=>{
    const clonedQuestions = {
      question: exam.questions[questionNo-1].question,
      note: exam.notes[questionNo - 1],
      opt1: exam.questions[questionNo - 1].options[0],
      opt2: exam.questions[questionNo - 1].options[1],
      opt3: exam.questions[questionNo - 1].options[2],
      opt4: exam.questions[questionNo - 1].options[3],
      answer: exam.questions[questionNo - 1].answer,
    };
    console.log('clonedQuestions :>> ', clonedQuestions);
    if (
      currentInpVal.question === clonedQuestions.question &&
      currentInpVal.note === clonedQuestions.note &&
      currentInpVal.opt1 === clonedQuestions.opt1 &&
      currentInpVal.opt2 === clonedQuestions.opt2 &&
      currentInpVal.opt3 === clonedQuestions.opt3 &&
      currentInpVal.opt4 === clonedQuestions.opt4 &&
      currentInpVal.answer === clonedQuestions.answer
    ){
      return true;
    }else{
      return false;
    }
  }

  const prevQuestion = () => {
    // let isUpdated=checkUpdation()
    // if(isUpdated===true){
       setQuestionNo(() => questionNo - 1);
       setValueInField(questionNo - 2)
      // }else{
      //   alert("first update data")
      // }
  };

  const nextQuestion = () => {
    let isUpdated=checkUpdation()
    if(isUpdated===true){
      setQuestionNo(() => questionNo + 1);
      if (questionNo < exam.questions.length) {
        setValueInField(questionNo);
      } else {
        clear();
      }
    } else {
      alert("first update data");
    }
  };
  
  return (
    <>
      <div className="renderData">
        {questionNo <= 15 ? (
          <>
            <h2>Question No : {questionNo}</h2>
            <label>Select Subject : </label>
            <select
              disabled={questionNo === 1 ? false : true}
              onChange={getQuestion}
              name="subjectName"
            >
              {SubjectList.map((SubName, index) => {
                return (
                  <option key={index} value={SubName}>
                    {SubName}
                  </option>
                );
              })}
            </select>
            {questionNo === 1 && exam.subjectName === "" && (
              <label className="requireMsg">{error}</label>
            )}
            <br />
            <br />
            {QuestionSet && (
              <FormView
                attribute={QuestionSet}
                error={error}
                values={exam}
                onChange={getQuestion}
              />
            )}
            {radioBtnAttribute.map((e, index) => {
              return (
                <div key={index}>
                  {
                    <CustomInput
                      label={
                        <CustomInput
                          type="radio"
                          name="selectOpt"
                          value={e.value}
                          isChecked={exam.selectOpt === e.value}
                          onChange={getQuestion}
                        />
                      }
                      requireField={error}
                      value={e.value}
                      onChange={getQuestion}
                      placeholder={e.placeholder}
                      name={e.name}
                    />
                  }
                </div>
              );
            })}
            <CustomInput
              type="text"
              name="answer"
              placeholder="Answer"
              value={exam.selectOpt}
              requireField={error}
              readOnly
            />
          </>
        ) : (
          <h1>exam created</h1>
        )}
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {questionNo <= 15 && (
            <>
              <CustomButton
                value="Pre"
                isDisabled={questionNo !== 1 ? false : true}
                onClick={() => {
                  prevQuestion();
                }}
              />
              <CustomButton
                value="next"
                isDisabled={questionNo !== 15 ? false : true}
                onClick={() => { exam.selectOpt !== "Answer..." &&
                Object.values(exam).some((e) => e === "") === false ? nextQuestion() : setError("This field is Required");
                }}
              />
              <CustomButton value="Clear" onClick={clear} />
            </>
          )}
          <CustomButton
            value={questionNo <= exam.questions.length ? "update" : "add"}
            onClick={AddQuestion}
          />
          {questionNo === 16 && (
            <CustomButton
              value="create exam"
              onClick={() =>
                fetchDataPost("/dashboard/Teachers/Exam", getToken, exam)
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
export default CreateExam;
