import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { fetchDataGet,fetchDataDel } from "./DataLogic";
import { useLocation } from "react-router-dom";

const useShowData = (api,h1,a1,h2,a2,h3,a3,h4,a4,h5,c5,navigate,btnText,btnText1) => {
  const [stuData, setStuData] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  let ids = SearchId.get("id");
  const ids1=localStorage.getItem("id")
  let naviGate = useNavigate();
  useEffect(() => {
    ids1? fetchDataGet(`${api}?id=${ids1}`,setStuData,setRows):
    fetchDataGet(api,setStuData,setRows)
    return () => {
      setRows([]);
    };
  }, []);
  
  const ViewData = (id,ques,notes,subjectName) => {
    naviGate(`${navigate}?id=${id===undefined?ids:id}&index=${ques!==undefined && ques}`,{state:{id:id}})
    id && localStorage.setItem('id',id)
    ques && localStorage.setItem('ques',ques)
    id && localStorage.setItem('notes',JSON.stringify(notes))
    id && localStorage.setItem('subjectName',subjectName)
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
   h1 ? { Header: h1, accessor: a1 }:{show: false},
   h2 ? {
      Header: h2,
      accessor:a2,
      Cell: e=> (e.value + ",").slice(0,-1)
    }:{show: false},
   h3? {
      Header: h3,
      accessor: a3,
    }:{show: false},
    h4?{Header: h4, accessor: a4}:{show: false},
    h5?{Header: h5, columns: c5 }:{show: false},
    {
      Header: "Action",
      Cell: (props) => {
        const rowId = props.row._id;
        const rowQues=props.row.question;
        const notes=props.row.notes
        const subjectName=props.row.subjectName
        return (
          <>
          <button
          onClick={() => {
              ViewData(rowId,rowQues,notes,subjectName);
            }}
           disabled={props.original.Result && props.original.Result.length!==0?true:false}
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