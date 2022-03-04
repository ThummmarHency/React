import React from "react";
import ShowStudentData from "./ShowStudentData";

const VerifyData = () => {
  return (
    <div>
      <ShowStudentData api="/dashboard/Teachers/StudentForExam" />
    </div>
  );
};

export default VerifyData;
