import React, { useState, useEffect } from "react";
import FormView from "../../Shared/FormView";
import CustomButton from "../../Shared/CustomButton";
import CustomInput from "../../Shared/CustomInput";
import useCreateExam from "../../Container/useCreateExam";
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../../Container/DataLogic";

const CreateExam = () => {
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState({});
  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  let ids = SearchId.get("id");
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
  console.log("rows :>> ", rows);
  
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
   rows && setRows1({
      subjectName: "",
      questions: rows.questions,
      notes: [1],
      note: "",
      question: "",
      selectOpt: "Answer...",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
    });
  }, [rows]);

  const [
    {
      error,
      selectValue,
      questionNo,
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
    },
  ] = useCreateExam({
    exam:ids?(rows1.questions === undefined ? exam1 : rows1) : exam1,
    setExam:ids? (rows1.questions === undefined ? setExam1 : setRows1) : setExam1,
    
  });
  return (
    <>
      <div className="renderData">
        {questionNo <= 15 ? (
          <>
            <h2>Question No : {questionNo}</h2>
           {ids?null:
          <> <label>Select Subject : </label>
            <select
              disabled={questionNo === 1 ? false : true}
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
            {questionNo === 1 && selectValue === "" && (
              <label className="requireMsg">{error}</label>
            )}</>}
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
                      errorMsg="White space not allow"
                      pattern={/[^ ][A-Za-z0-9_ ]{0,}$/}
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
                isDisabled={questionNo !== 1 ? false : true}
                onClick={() => {
                  fieldRequire(prevQuestion);
                }}
              />
              <CustomButton
                value="next"
                isDisabled={
                  questionNo !== 15 && questionNo <= exam.questions.length
                    ? false
                    : true
                }
                onClick={() => {
                  fieldRequire(nextQuestion);
                }}
              />
              <CustomButton value="Clear" onClick={clear} />
              <CustomButton
                value={
                  questionNo < 15
                    ? questionNo <= exam.questions.length
                      ? "update"
                      : "add"
                    : "create exam"
                }
                onClick={AddQuestion}
              />
            </div>
          </>
        ) : (
          <h1>Exam Created </h1>
        )}
      </div>
    </>
  );
};
export default CreateExam;
