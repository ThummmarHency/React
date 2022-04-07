import React,{ useState,useEffect} from "react";
import ReactTable from "react-table-6";
import { getToken } from "../../Container/DataLogic";
import {fetchDataPost} from '../../Container/DataLogic'
const PendingExam = () => {
  const [queAns,setQueAns]=useState([])
  let data = localStorage.getItem("pendingExam");
  let acData = JSON.parse(data);
  let quesId=localStorage.getItem("idArray")
  const subId=localStorage.getItem("id")
  let idArray=JSON.parse(quesId)
  const ans="Answer...";
  const subjectName=localStorage.getItem("subjectName")
  
  useEffect(() => {
    let i=0
    Object.values(acData).map((e)=>setQueAns((oldObj)=> ([...oldObj,
      {
      question:idArray[i++],
      answer:e.answer===undefined?ans:e.answer
    }])) ); 

    return(()=>{
      localStorage.removeItem("idArray")
    })
  },[])
  const columns = [
    {
      Header: "question",
      accessor: "question",
    },
    {
      Header: "Options",
      columns: [
        { Header: "Ans1", accessor: "options[0]" },
        { Header: "Ans2", accessor: "options[1]" },
        { Header: "Ans3", accessor: "options[2]" },
        { Header: "Ans4", accessor: "options[3]" },
      ],
    },
    {
      Header: "Answer",
      Cell: (props) => {
        return (
          <>
            {props.original.answer === ans
              ? "-"
              : props.original.answer===undefined?"-": props.original.answer}
          </>
        );
      },
    },
    {
      Header: "Action",
      Cell: (props) => {
        return (
            <button onClick={() => {
              localStorage.setItem("pendingExam-Question",props.original?.question)
              window.location="/student-dashboard/exam-paper"
              }}>
              {props.original?.answer === ans? "Attempt" :props.original?.answer === undefined?"Attempt" :"Update"}
            </button>
        );
      },
    },
  ];
  return (
    <div className="renderData">
        <h2>Exam Preview</h2> 
        <label>Subject : {subjectName} </label>
      <ReactTable
        data={acData}
        columns={columns}
        defaultPageSize={7}
        pageSizeOptions={[7]}
      ></ReactTable>
      <button onClick={()=>fetchDataPost(`/student/giveExam?id=${subId}`,getToken,queAns) } >Submit Exam</button>
    </div>
  );
};

export default PendingExam;
