import React from "react";
import CustomTable from "../../Shared/CustomTable";
import ShowData from "../../Shared/ShowData";

const ViewData = () => {
  
  return (
    <div>
     <CustomTable api="/dashboard/Teachers/viewStudentDetail" />
     {/* <ShowData api="/dashboard/Teachers/viewStudentDetail" h1="Id" a1="_id" h2="SubjectName" a2="name"  h4="rank" a4="Result[0].rank" navigate="../exam-detail" Header="View Exam"/> */}

     
    </div>
  );
};

export default ViewData;
