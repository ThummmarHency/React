import React from "react";
import "react-table-6/react-table.css";
import ShowData from '../../Shared/ShowData'

const ShowStudentData = ({api="/dashboard/Teachers"}) => {
  
  return (
    <div>
      <ShowData api={api} h1="Id" a1="_id" h2="Name" a2="name" h3="Email" a3="email" h4="Status" a4="status" navigate="../view-Data" Header="Student Data" btnText="View"/>
    </div>
  );
};

export default ShowStudentData;
