import React,{useEffect} from 'react'
import useShowData from '../Container/useShowData'
import ReactTable from "react-table-6";
import SearchBar from "material-ui-search-bar";

const ShowData = ({api,h1,a1,h2,a2,h3,a3,h4,a4,h5,c5, navigate,Header,btnText,btnText1}) => {
  useEffect(() => {
    if(window.location.pathname==="/student-dashboard/all-exam")
      {localStorage.removeItem("pendingExam")
      localStorage.removeItem("pendingExam-Question")}
    
  },[])
const [{rows,columns,cancelSearch,searched,requestSearch}]=useShowData(api,h1,a1,h2,a2,h3,a3,h4,a4,h5,c5,navigate,btnText,btnText1);

  return (
      <div className="renderData">
        <br />
         {rows ? rows.length===0? <div className="loading"></div>: <>
            <h2>{Header}</h2> 
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <ReactTable
              data={Array.isArray(rows)?rows:rows.questions}  
              columns={columns}
              defaultPageSize={10}
              pageSizeOptions={[10]}
            ></ReactTable>
          </> : "No data Found"}
      
      </div>
  )
}

export default ShowData