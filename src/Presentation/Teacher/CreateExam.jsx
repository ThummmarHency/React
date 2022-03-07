import React from "react";
import FormView from "../User/FormView";
import CustomButton from "../../Shared/CustomButton";
import { fetchDataPost, getToken } from '../../Container/DataLogic'
import CustomInput from "../../Shared/CustomInput";
import useCreateExam from "../../Container/useCreateExam"
const SubjectList = ["","React", "Node js", "Angular", "Ux/Ui"];

const CreateExam = () => {
  const [{isDisabled,error,questionNo,setQuestionNo,QuestionSet,rdoValue,getQuestion,AddQuestion,ClearForm,values,PrevNextQuestion,getSubject,exam}]=useCreateExam()
  
  return (
    <>
      <div className="renderData">
      {questionNo!==16 && 
      <>
        <h2>Question No : {questionNo}</h2>
        <label>Select Subject : </label>
        <select disabled={isDisabled} onChange={getSubject} >
          {SubjectList.map((SubName, index) => {
            return <option key={index} value={SubName}>{SubName}</option>
          })}
        </select>
        <br />
        <br />
        {QuestionSet && <FormView attribute={QuestionSet} error={error} values={values} onChange={getQuestion} />}
        <CustomInput type="text" name="answer" value={rdoValue.selectOpt} Requirefield={error} readOnly/>
        </>}
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CustomButton value="Pre" isDisabled={questionNo !== 1 ? false : true} onClick={()=>{setQuestionNo(questionNo - 1); PrevNextQuestion(questionNo-2);}} />
          <CustomButton value="next" isDisabled={questionNo!==15 ?false:true} onClick={()=>{setQuestionNo(questionNo + 1); PrevNextQuestion(questionNo);}} />
          <CustomButton value="Clear" onClick={ClearForm} />
          <CustomButton value="add" isDisabled={questionNo!==16?false:true} onClick={AddQuestion} />  
         {questionNo === 16 && <CustomButton value="create exam" onClick={() => fetchDataPost("/dashboard/Teachers/Exam", getToken, exam)} />}

        </div>
      </div>
    </>
  )
};

export default CreateExam;
