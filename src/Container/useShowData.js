import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { fetchDataGet } from "./DataLogic";

const useShowData = (api,h1,a1,h2,a2,h3,a3,h4,a4,navigate) => {
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

  const ViewData = (id) => {
     naviGate(`${navigate}?id=${id}`)
  };

  const columns = [
    { Header: h1, accessor: a1 },
    {
      Header: h2,
      accessor: a2,
    },
    {
      Header: h3,
      accessor: a3,
    },
    { Header: h4, accessor: a4 },
    {
      Header: "View",
      Cell: (props) => {
        const rowId = props.row._id;
        return (
          <button
            onClick={() => {
              ViewData(rowId);
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
      return row._id.toLowerCase().includes(searchedVal.toLowerCase());
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

export default useShowData