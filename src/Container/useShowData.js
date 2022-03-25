import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { fetchDataGet,fetchDataDel } from "./DataLogic";
import { useLocation } from "react-router-dom";

const useShowData = (api,h1,a1,h2,a2,h3,a3,h4,a4,navigate,btnText,btnText1,notes) => {
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
  
  const ViewData = (id,ques,notes) => {
    naviGate(`${navigate}?id=${id===undefined?ids:id}&index=${ques!==undefined && ques}`,{state:notes})
  };
  
  const deleteExam=(id)=>{  
  var result = window.confirm("Are you sure you want to delete exam?");
  if (result) {
    fetchDataDel(`/dashboard/Teachers/deleteExam?id=${id}`)
    const newExamList=rows.filter((item)=>item._id!==id)
    setRows(newExamList)
  }
  }
  const columns = [
    { Header: h1, accessor: a1 },
    {
      Header: h2,
      accessor:a2,
      Cell: e=> (e.value + ",").slice(0,-1)
    },
    {
      Header: h3,
      accessor: a3,
    },
    {Header: h4, accessor: a4},
    {
      Header: "Action",
      Cell: (props) => {
        const rowId = props.row._id;
        const rowQues=props.row.question;
        const notes=props.row.notes
        return (
          <>
          <button
          onClick={() => {
              ViewData(rowId,rowQues,notes);
            }}
          >
            {btnText}
          </button>
          {btnText1 && <button
          onClick={()=>{
            deleteExam(rowId)
          }}>
            {btnText1}
          </button>}
          </>
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