import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../Container/DataLogic";

const CustomTable = ({api,Header}) => {
  const [resultData, setResultData] = useState();
  const location = useLocation();
  useEffect(() => {
 fetchDataGet(location!==null ? `${api}?id=${location.state.id}` : api, undefined, undefined, setResultData)
    return () => {
      setResultData([]);
    };
  }, []);
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
      <h2>{Header}</h2>
      <table className="tbl">
       { <tbody>{resultData && tbl(resultData[0])}</tbody> }
      </table>
    </div>
  );
};

export default CustomTable;
