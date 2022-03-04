import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { fetchDataGet } from "./DataLogic";

const useStudentData = (api) => {
  const [stuData, setStuData] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  let naviGate = useNavigate();

  useEffect(() => {
    fetchDataGet(api,setStuData,setRows);
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

  return [  
   {rows,columns,cancelSearch,searched,requestSearch}
  ]
}

export default useStudentData