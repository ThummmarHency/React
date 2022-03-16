import React from "react";
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
import { fetchDataPost, getToken } from "../../Container/DataLogic";
import CustomInput from "../../Shared/CustomInput";
import useCreateExam from "../../Container/useCreateExam";

const CreateExam = () => {
  const [{error,selectValue,questionNo,QuestionSet,SubjectList,radioBtnAttribute,fieldRequire,prevQuestion,nextQuestion,clear,getQuestion,AddQuestion,exam}]=useCreateExam()
  
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
        {questionNo <= 15 && (
            <>
          <CustomButton
            value="Pre"
            isDisabled={questionNo !== 1 ? false : true}
            onClick={() => {fieldRequire(prevQuestion)}}
          />
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
