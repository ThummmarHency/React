import React,{useState,useEffect} from 'react'
import ShowData from '../../Shared/ShowData'
import CustomTable from '../../Shared/CustomTable'
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../../Container/DataLogic";

const ExamDetail = () => {
//   const [resultData, setResultData] = useState();
//   const location = useLocation();
//   let SearchId = new URLSearchParams(location.search);
//   let id = SearchId.get("id");

//   useEffect(() => {
//     fetchDataGet(`/dashboard/Teachers/examDetail?id=${id}`, undefined, undefined, setResultData);
//     return () => {
//       setResultData([]);
//     };
//   }, []);
//   console.log("resultData :>> ", resultData);

//  const tHead=(rd)=>{
//   return  rd && Object.keys(rd).map((d,i)=>(
//       Array.isArray(d)? d.map((p)=>(
//         <th>{p}</th>
//       )):
//       <th key={i}>{d}</th>
//     ))
 
//  }
//  const tBody=(rd)=>{

//   return <tr>
//     {rd && 
//       Object.values(rd).map((e)=>(
//         Array.isArray(e)? 
//           e.map((a)=>{
//             return (
//               <React.Fragment>
//                <tr> {tHead(a)}</tr>
//                 {tBody(a)}
//               </React.Fragment>
//             );
//             }):
//               (<td>{e}</td>)
         
//       ))
     
//       }
//     </tr>
//  }
  return (
    <div>
        {/* <CustomTable api="/dashboard/Teachers/examDetail" btn="bghf"/> */}
      <ShowData api="/dashboard/Teachers/examDetail" h1="answer" a1="answer" navigate="../exam-detail" Header="View Exam"/>
      {/* <table>
        <thead><tr> {resultData && tHead(resultData)} </tr></thead>
        <tbody>{resultData && tBody(resultData)}</tbody>
      </table> */}
    </div>
  )
}

export default ExamDetail