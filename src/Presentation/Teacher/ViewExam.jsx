import React from 'react'
import ShowData from '../../Shared/ShowData';
const ViewExam = () => {
    
  return (
    <div >
      <ShowData api="/dashboard/Teachers/viewExam" h1="Id" a1="_id" h2="SubjectName" a2="subjectName" h3="Email" a3="email" h4="notes" a4="notes" navigate="../exam-detail" Header="View Exam" btnText="View"/>

    </div>
  )
}

export default ViewExam