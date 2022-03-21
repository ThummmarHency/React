import React from "react";
import CustomTable from "../../Shared/CustomTable";

const ViewData = () => {
  
  return (
    <div>
     <CustomTable api="/dashboard/Teachers/viewStudentDetail" />
    </div>
  );
};

export default ViewData;
