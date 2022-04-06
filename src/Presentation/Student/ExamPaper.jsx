import React, { Suspense } from 'react'
const CreateExam = React.lazy(() => import('../Teacher/CreateExam')); 
const ExamPaper = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateExam />
      </Suspense>
    </div>
  )
}

export default ExamPaper