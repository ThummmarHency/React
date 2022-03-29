import React from "react";
import CustomTable from "../../Shared/CustomTable";
import ShowData from "../../Shared/ShowData";

const ViewData = () => {
  return (
    <div>
     <CustomTable api="/dashboard/Teachers/viewStudentDetail" Header="Student data" />
     {/* <ShowData api="/dashboard/Teachers/viewStudentDetail" h1="Id" a1="_id" h2="Name" a2="name" h3="Email" a3="email" h4="rank" a4="Result[0].rank" h5="Score" a5="Result[0].score" /> */}
    </div>
  );
};

export default ViewData;
