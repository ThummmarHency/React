import React from "react";
import ShowData from "../../Shared/ShowData";

const Allexam = () => {
  return (
    <ShowData
      api="/student/studentExam"
      h1="Id"
      a1="_id"
      h2="Subject"
      a2="subjectName"
      h3="Email"
      a3="email"
      h4="Notes"
      a4="notes"
      h5="Result"
      c5={[
        {
          Header: "Id",
          accessor: "Result[0]._id",
        },
        {
          Header: "Subject",
          accessor: "Result[0].subjectName",
        },
        {
          Header: "status",
          accessor: "Result[0].resultStatus",
        },
        {
          Header: "Rank",
          accessor: "Result[0].rank",
        },
        {
          Header: "Score",
          accessor: "Result[0].score",
        },
      ]}
      navigate="../exam-paper"
      btnText="give exam"
      Header="All Exam"
    />
  );
};

export default Allexam;
