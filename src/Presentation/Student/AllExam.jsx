import React from 'react'
import ShowData from '../../Shared/ShowData'

const Allexam = () => {
  return (
      <ShowData api="/student/studentExam" h1="Id" a1="_id" h2="Notes" a2="notes" h3="Email" a3="email" h4="SubjectName" a4="subjectName" navigate="../exam-detail" Header="View Exam" btnText="View"/>
  )
}

export default Allexam