import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { fetchDataGet } from "./DataLogic";
import { useLocation } from "react-router-dom";

const useShowData = (api,h1,a1,h2,a2,h3,a3,h4,a4,navigate,btnText) => {
  const [stuData, setStuData] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  let ids = SearchId.get("id");

  let naviGate = useNavigate();
  useEffect(() => {
    ids? fetchDataGet(`${api}?id=${ids}`,setStuData,setRows):
    fetchDataGet(api,setStuData,setRows)
    return () => {
      setRows([]);
    };
  }, []);

  const ViewData = (id) => {
     naviGate(`${navigate}?id=${id===undefined?ids:id}`)
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
      Header: "Action",
      Cell: (props) => {
        const rowId = props.row._id;
        return (
          <button
            onClick={() => {
              ViewData(rowId);
            }}
          >
            {btnText}
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