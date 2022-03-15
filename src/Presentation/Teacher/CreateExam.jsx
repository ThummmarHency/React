import React, { useState } from "react";
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
  const currentInpVal = {
    question: exam.question,
    note: exam.note,
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

  const getQuestion = (e) => {
    (e.target.name === "selectOpt" && e.target.value === "")
      ? alert("First fill field")
      : setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const radioBtnAttribute = [
    { value: exam.opt1},
    { value: exam.opt2},
    { value: exam.opt3},
    { value: exam.opt4},
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
  console.log("exam >> ", exam);
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
    notes: [...exam.notes, exam.note],
  };
  const sameOptAlert = () => {
   let mapOption= optionArray.map((value)=>value===currentInpVal.answer); 
    if (optionArray.some((val, i) => optionArray.indexOf(val) !== i)) {
      alert("Question having same options");
    } else {
      if(mapOption.some((isSame)=>isSame===true)===false){
        alert("Answer not match")
      }
        else{
          return true;
        }
    }
  };
  // console.log('questionNo-1 :>> ', exam.questions[questionNo-1]);
  Object.values(exam.questions).map((quesValue, i) => {
    console.log('i[quesValue] :>> ', exam.questions[questionNo-2].question===currentInpVal.question );
    console.log("result :>> ", quesValue.question, "i >>", i);
    return quesValue.question === currentInpVal.question ;
  });

  const AddQuestion = () => {
    const PushData = () => {
      if (sameOptAlert() === true) {
        setError(null);
        setQuestionNo(questionNo + 1);
        setExam(setDataInState);
        questionNo !== 15 && ClearForm();
      }
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
      }
    };

    let result = Object.values(exam.questions).map((quesValue, i) => {
      console.log("result :>> ", quesValue.question, "i >>", i);
      return quesValue.question === currentInpVal.question;
    });

    exam.selectOpt !== "Answer..." &&
    Object.values(exam).some((e) => e === "") === false
      ? questionNo <= exam.questions.length
        ?  updateData()
        : result.some((tr) => tr === true)? alert("question repeated"): PushData()
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
  
  const fieldRequire=(Question)=>{
    console.log('exam.selectOpt !== "Answer..." && :>> ', Object.values(exam).some((e) => e === "") === false);
    ((exam.selectOpt !== "Answer..." &&
     Object.values(exam).some((e) => e === "")) === false)
      ? Question()
      : setError(()=>"This field is Required");
  }
  const checkUpdation = (index) => {
    console.log('index :>> ', index);
    const clonedQuestions = {
      question: exam.questions[index].question,
      note: exam.notes[index],
      opt1: exam.questions[index].options[0],
      opt2: exam.questions[index].options[1],
      opt3: exam.questions[index].options[2],
      opt4: exam.questions[index].options[3],
      answer: exam.questions[index].answer,
    };
    if (Object.values(currentInpVal).some((e) => e === "") === false) {
      if (JSON.stringify(currentInpVal) === JSON.stringify(clonedQuestions)) {
        return true;
      }
    } else {
      return true;
    }
  };

  const prevQuestion = () => {
    setError(null);
    let isUpdated = checkUpdation(
      questionNo - 1 === exam.questions.length ? questionNo - 2 : questionNo - 1
    );
    if (isUpdated === true || questionNo-1===exam.questions.length) {
      setQuestionNo(() => questionNo - 1);
      setValueInField(questionNo - 2);
    } else {
        alert("first update data")
    }
  };

  const nextQuestion = () => {
    setError(null);
    let isUpdated = checkUpdation(questionNo - 1);
    if (isUpdated === true) {
      setQuestionNo(() => questionNo + 1);
      if (questionNo < exam.questions.length) {
        setValueInField(questionNo);
      } else {
        clear();
      }
    } else {
      alert("First update data");
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
                      placeholder={`Option${index + 1}`}
                      name={`opt${index + 1}`}
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
          <CustomButton
            value="Pre"
            isDisabled={questionNo !== 1 ? false : true}
            onClick={() => {fieldRequire(prevQuestion)}}
          />
          {questionNo <= 15 && (
            <>
              <CustomButton
                value="next"
                isDisabled={
                  questionNo !== 15 && questionNo <= exam.questions.length
                    ? false
                    : true
                }
                onClick={() => {fieldRequire(nextQuestion)}}
              />
              <CustomButton value="Clear" onClick={clear} />
              <CustomButton
                value={questionNo <= exam.questions.length ? "update" : "add"}
                onClick={AddQuestion}
              />
            </>
          )}
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
