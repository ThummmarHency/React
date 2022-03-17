import React from 'react'
import ShowData from '../../Shared/ShowData'

const ExamDetail = () => {

  return (
    <div>
        {/* <CustomTable api="/dashboard/Teachers/examDetail"/> */}
      <ShowData api="/dashboard/Teachers/examDetail" h1="Id" a1="options" h2="SubjectName" a2="question" h3="Email" a3="answer" navigate="../exam-detail" Header="View Exam"/>

    </div>
  )
}

export default ExamDetail