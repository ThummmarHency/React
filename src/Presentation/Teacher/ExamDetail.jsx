import React from 'react'
import ShowData from '../../Shared/ShowData'
import { useLocation } from "react-router-dom";

const ExamDetail = () => {
  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  // let ids = SearchId.get(state.note);
  console.log('location :>> ', location);
  return (
    <div>
     <ShowData api="/dashboard/Teachers/examDetail" h1="Question" a1="question" h2="Options" a2="options"    
      h3="Answer" a3="answer" navigate="../edit-exam" Header="View Exam detail" btnText="Edit exam" />
    </div>
  )
}

export default ExamDetail