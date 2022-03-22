import React from 'react'
import useShowData from '../Container/useShowData'
import ReactTable from "react-table-6";
import SearchBar from "material-ui-search-bar";

const ShowData = ({api,h1,a1,h2,a2,h3,a3,h4,a4,navigate,Header,btnText}) => {

const [{rows,columns,cancelSearch,searched,requestSearch}]=useShowData(api,h1,a1,h2,a2,h3,a3,h4,a4,navigate,btnText);

  return (
      <div className="renderData">
        <br />
        {console.log('rows :>> ', rows) }
        <h2>{Header}</h2> 
         {rows ?  <>
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