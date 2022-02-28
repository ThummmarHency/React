import React from "react";
import ShowStudentData from "./ShowStudentData";

const VerifyData = () => {
  return (
    <div>
      <ShowStudentData Api="/dashboard/Teachers/StudentForExam" />
    </div>
  );
};

export default React.memo(VerifyData);
