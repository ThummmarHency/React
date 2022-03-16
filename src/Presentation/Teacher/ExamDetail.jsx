import React from 'react'
import CustomTable from '../../Shared/CustomTable'

const ExamDetail = () => {

  return (
    <div>
        <CustomTable api="/dashboard/Teachers/examDetail"/>
    </div>
  )
}

export default ExamDetail