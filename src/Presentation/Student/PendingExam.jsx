import React from 'react'
import ReactTable from "react-table-6";

const PendingExam = () => {
  let data=localStorage.getItem("pendingExam")
  let acData=JSON.parse(data)
  console.log('stateExam :>> ',acData);

  const columns=[
    {
      Header:"question",
      accessor:"question"
    },
    {
      Header:"Options",
      columns:[
        {Header:"Ans1",accessor:"options[0]"},
        {Header:"Ans2",accessor:"options[1]"},
        {Header:"Ans3",accessor:"options[2]"},
        {Header:"Ans4",accessor:"options[3]"},
      ]
    },
    {
      Header:"Answer",
      accessor:"answer"
    },
    {
      Header: "Action",
      Cell: (props) => {
        
        return (
          <>
          <button
          onClick={() => {
             
            }}
          >
            Attempt
          </button>
       
          </>
        );
      },
    },
  ]
  return (
    <div className="renderData">
       <ReactTable
              data={acData}  
              columns={columns}
              defaultPageSize={10}
              pageSizeOptions={[10]}
            ></ReactTable>
            </div>
  )
}

export default PendingExam