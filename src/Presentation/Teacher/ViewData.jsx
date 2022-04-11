import React from "react";
import CustomTable from "../../Shared/CustomTable";

const ViewData = () => {
  return (
      <CustomTable
        api="/dashboard/Teachers/viewStudentDetail"
        Header="Student data"
      />
  );
};

export default ViewData;
