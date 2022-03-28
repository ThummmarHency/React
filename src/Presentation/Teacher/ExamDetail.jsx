import React from 'react'
import ShowData from '../../Shared/ShowData'

const ExamDetail = () => {
  return (
    <div>
     <ShowData api="/dashboard/Teachers/examDetail" h1="Question" a1="question" h2="Options" a2="options"    
      h3="Answer" a3="answer" navigate="../edit-exam" Header="View Exam detail" btnText="Edit exam" />
    </div>
  )
}

export default ExamDetail