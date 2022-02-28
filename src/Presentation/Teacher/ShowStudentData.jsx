import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {useNavigate} from 'react-router-dom'
import SearchBar from "material-ui-search-bar";

const ShowStudentData = () => {
  const [stuData, setstudata] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  let getData = localStorage.getItem("token");
  const data = JSON.parse(getData);
  const token1 = data.data.token;

  let naviGate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        process.env.REACT_APP_API + "/dashboard/Teachers",
        { headers: { "access-token": `${token1}` } }
      );
      setstudata(res.data.data);
      console.log(res.data.data[0]._id);
      setRows(res.data.data);
    }
    fetchData();
    return setstudata([]);
  }, []);

  const Viewdata = (id)=>{
      console.log(id);
    naviGate("../viewData")      
}
  const columns = [
    { Header: "Id", accessor: "_id" },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    { Header: "Status", accessor: "status" },
    {
      Header: "View",
      Cell: () => (
        <button onClick={Viewdata}>View</button>
      )
    },
  ];

  const requestSearch = (searchedVal) => {
    const filteredRows = stuData.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  return (
    <div>
      <div className="renderData">
        <br />
        <h2>Student Data</h2>
    
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
      </div>
    </div>
  );
};

export default ShowStudentData;
