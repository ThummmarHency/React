import React, { useState, useEffect } from "react";
import { fetchDataGet } from "../Container/DataLogic";

const CustomTable = ({api,Header,editPfl}) => {
  const [resultData, setResultData] = useState();
  const id=localStorage.getItem("id")
  useEffect(() => {
 fetchDataGet(id!==null ? `${api}?id=${id}` : api, undefined, undefined, setResultData)
    return () => {
      setResultData([]);
    };
  }, []);
  console.log('resultData :>> ', resultData);
  const tbl=(data)=>{ 
    return (
      data && Array.isArray(data)?data.map((dt,i)=>(
        <React.Fragment key={i}>
        <tr>{tbl(dt)}</tr>
        </React.Fragment>
      )):
      data && Object.entries(data).map(([key, value], index)=>(
        <React.Fragment key={index}>
        <tr><th>{key}</th>
        {Array.isArray(value)?tbl(value):
        <td>{value}</td>}</tr>
        </React.Fragment>)
        )
    )
  }
  return (
    <div className="renderData">
      {resultData===undefined? <div className="loading"></div>: 
      <>
      <h2>{Header}</h2>
      <table className="tbl">
       { <tbody>{resultData && Array.isArray(resultData)?tbl(resultData[0]):tbl(resultData)}</tbody> }
      </table>
      {editPfl && <button onClick={()=>window.location="/student-dashboard/edit-profile"}>{editPfl}</button> }
      </>}
    </div>
  );
};

export default CustomTable;
