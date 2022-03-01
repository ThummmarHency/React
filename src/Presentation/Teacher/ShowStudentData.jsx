import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "material-ui-search-bar";

let getData = localStorage.getItem("token");
const data1= JSON.parse(getData);
export const token1 = data1 && data1.data.token;

const ShowStudentData = ({Api="/dashboard/Teachers"}) => {
  const [stuData, setstudata] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  let naviGate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        process.env.REACT_APP_API + `${Api}`,
        { headers: { "access-token": `${token1}` } }
      );
    setstudata(res.data.data);
     setRows(res.data.data);
    }
    fetchData();

    return () => {
      setRows([]);
    };
  }, []);

  const Viewdata = (id) => {
     naviGate(`../viewData?id=${id}`)
  };

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
      Cell: (props) => {
        const rowId = props.row._id;
        return (
          <button
            onClick={() => {
              Viewdata(rowId);
            }}
          >
            View
          </button>
        );
      },
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
