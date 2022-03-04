import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import SearchBar from "material-ui-search-bar";
import useStudentData from '../../Container/useStudentData'
const ShowStudentData = ({api="/dashboard/Teachers"}) => {
  
  const [{rows,columns,cancelSearch,searched,requestSearch}]=useStudentData(api);
  return (
    <div>
      <div className="renderData">
        <br />
        <h2>Student Data</h2> 
         {rows ?  <>
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <ReactTable
              data={rows}
              columns={columns}
              defaultPageSize={10}
              pageSizeOptions={[10]}
            ></ReactTable>
          </> : "No data Found"}
      
      </div>
    </div>
  );
};

export default ShowStudentData;
