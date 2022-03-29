import React, { useState, useEffect } from "react";
import FormView from "../../Shared/FormView";
import CustomButton from "../../Shared/CustomButton";
import CustomInput from "../../Shared/CustomInput";
import useCreateExam from "../../Container/useCreateExam";
import { useLocation } from "react-router-dom";
import { fetchDataGet} from "../../Container/DataLogic";

const CreateExam = () => {
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState({});
  const [questionNo1, setQuestionNo1] = useState(1);
  const [nxtBtn1,setNxtBtn1]=useState(false);
  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  let ids = SearchId.get("id");
  let index = SearchId.get("index");
  const lNote=localStorage.getItem("notes")
  const note = lNote==='undefined' ? null :JSON.parse(lNote) 
  const subjectName=localStorage.getItem("subjectName")

  useEffect(() => {
    fetchDataGet(
      `/dashboard/Teachers/examDetail?id=${ids}`,
      undefined,
      setRows
    );
    return () => {
      setRows([]);
    };
  }, []);
  
  const [exam1, setExam1] = useState({
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

  useEffect(() => {
   rows && 
          setRows1({
            subjectName:subjectName,
            questions: rows.questions,
            notes:note,
            note: "",
            question: "",
            selectOpt: "Answer...",
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: "",
          })
        rows && ids ? setQuestionNo1((Object.values(rows)[0]?.map((e)=>{return Object.values(e)[1]}).indexOf(index))+1):setQuestionNo1(1)
  }, [rows]);
  const [
    {
      error,
      selectValue,
      QuestionSet,
      SubjectList,
      radioBtnAttribute,
      fieldRequire,
      prevQuestion,
      nextQuestion,
      clear,
      getQuestion,
      AddQuestion,
      exam,
      notes
    },
  ] = useCreateExam({
    exam: ids ? (rows1.questions === undefined ? exam1 : rows1) : exam1,
    setExam: ids
    ? rows1.questions === undefined
    ? setExam1
    : setRows1
    : setExam1,
    questionNo:ids?(rows1.questions === undefined ? questionNo1 : questionNo1):questionNo1,
    setQuestionNo: ids?rows1.questions === undefined ? setQuestionNo1:setQuestionNo1:setQuestionNo1,
    setNxtBtn:setNxtBtn1,
    ids:ids,
    subjectName:subjectName===null?"":subjectName
  });
  return (
    <>
      <div className="renderData">
        {questionNo1 <= 15 ? (
          <>
            <h2>Question No : {questionNo1}</h2>
            {ids ? <label>Subject : {subjectName} </label> : (
              <>
                <label>Select Subject : </label>
                <select
                  disabled={questionNo1 === 1 ? false : true}
                  onChange={getQuestion}
                  name="subjectName"
                  value={selectValue}
                >
                  {SubjectList.map((SubName, index) => {
                    return (
                      <option key={index} value={SubName}>
                        {SubName}
                      </option>
                    );
                  })}
                </select>
                {questionNo1 === 1 && selectValue === "" && (
                  <label className="requireMsg">{error}</label>
                )}
              </>
            )}
            <br />
            <br />
            {QuestionSet && (
              <>
              <FormView
                attribute={QuestionSet}
                error={error}
                values={exam}
                onChange={getQuestion}
              />
            Notes: <input type="text" 
            placeholder= "Enter Notes"
            label= "Notes : "
            name= "note"
            value={notes}
            pattern= {/[^ ][A-Za-z0-9_ ]{0,}$/}
            onChange={getQuestion}
            />
            </>
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
                      pattern={/[^ ][A-Za-z0-9_ ]{0,}$/}
                      errorMsg="White space not allow"
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

            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CustomButton
                value="Pre"
                isDisabled={questionNo1 !== 1 ? questionNo1-1===exam.questions.length?false: nxtBtn1 : true}
                onClick={() => {
                  fieldRequire(prevQuestion);
                }}
              />
              <CustomButton
                value="next"
                isDisabled={
                questionNo1 !== 15 && questionNo1 <= exam.questions.length
                    ? nxtBtn1
                    : true
                }
                onClick={() => {
                  fieldRequire(nextQuestion);
                }}
              />
              <CustomButton value="Clear" onClick={clear} />
              <CustomButton
                value={
                  questionNo1 < 15
                    ? questionNo1 <= exam.questions.length
                      ? "update"
                      : "add"
                    : ids ? "Update exam" :"create exam"
                }
                onClick={AddQuestion}
              />
            </div>
          </>
        ) : (
          ids ? "" : <h1>Exam Created </h1>
        )}
      </div>
    </>
  );
};
export default CreateExam;
