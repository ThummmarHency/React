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
    ans1: "",
    ans2: "", 
    ans3: "",
    ans4: "",
  });

  const getQuestion = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const radioBtnAttribute = [
    { value: exam.ans1, placeholder: "Option1",name:"ans1" },
    { value: exam.ans2, placeholder: "Option2",name:"ans2"},
    { value: exam.ans3, placeholder: "Option3",name:"ans3"},
    { value: exam.ans4, placeholder: "Option4",name:"ans4"},
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
      setExam({
        subjectName: exam.subjectName,
        questions: [
          ...exam.questions,
          {
            question: exam.question,
            answer: exam.selectOpt,
            options: [exam.ans1, exam.ans2, exam.ans3, exam.ans4],
          },
        ],
        notes: [...exam.notes, exam.note],
      });
      
      questionNo !== 15 && ClearForm();
    };
    console.log(exam.questions[0]);
   
    const updateData = () => {
      const updateExam = { ...exam };
        updateExam.questions[questionNo-1] = {
        question: exam.question,
        answer: exam.selectOpt,
        options: [exam.ans1, exam.ans2, exam.ans3, exam.ans4]
      }
      updateExam.notes[questionNo-1]=exam.note
       
      setExam(()=>updateExam)
      questionNo<exam.questions.length && nextQuestion()
    };

    exam.selectOpt !== "Answer..." &&
    Object.values(exam).some((e) => e === "") === false
      ? questionNo <= exam.questions.length
        ? updateData(exam.questions[questionNo - 1])
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
          options: [exam.ans1, exam.ans2, exam.ans3, exam.ans4],
        },
      ],
      notes: [...exam.notes, exam.note],
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      note: "",
      selectOpt: "Answer...",
    });
  };
  const prevQuestion = () => {
    setQuestionNo(()=>questionNo - 1);
    setExam({
      ...exam,
      question: exam.questions[questionNo - 2].question,
      ans1: exam.questions[questionNo - 2].options[0],
      ans2: exam.questions[questionNo - 2].options[1],
      ans3: exam.questions[questionNo - 2].options[2],
      ans4: exam.questions[questionNo - 2].options[3],
      note: exam.notes[questionNo - 2],
      selectOpt: exam.questions[questionNo - 2].answer,
    });
  };
  let x={...exam.questions}
  let updateExam = { ...exam }
  const nextQuestion = () => {
    console.log('x', x)
    console.log('updateExam.questions[questionNo-1]', updateExam.questions[questionNo-1])
    // console.log('{exam.question}', x[questionNo-1]===updateExam.questions[questionNo-1])
    // (x[questionNo-1]!==updateExam.questions[questionNo-1]) && alert("update first")

    setQuestionNo(()=>questionNo + 1) 
     setExam({
      ...exam,
      question: exam.questions[questionNo].question,
      ans1: exam.questions[questionNo].options[0],
      ans2: exam.questions[questionNo].options[1],
      ans3: exam.questions[questionNo].options[2],
      ans4: exam.questions[questionNo].options[3],
      note: exam.notes[questionNo],
      selectOpt: exam.questions[questionNo].answer,
    })
    console.log('questionNo :>> ', questionNo);
    
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
                onClick={() => { questionNo<exam.questions.length ? nextQuestion() : ClearForm();
                }}
              />
              <CustomButton value="Clear" onClick={ClearForm} />
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
