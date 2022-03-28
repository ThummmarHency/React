import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../Container/DataLogic";

const CustomTable = ({api}) => {
  const [resultData, setResultData] = useState();
  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  let id = SearchId.get("id");
  useEffect(() => {
   fetchDataGet(`${api}?id=${id}`, undefined, undefined, setResultData);
    return () => {
      setResultData([]);
    };
  }, []);

  const tableHead = (resultDat,i) => {
    return (
      <tr key={i}>
        {resultDat &&
             Object.keys(resultDat).map((keyName, index) => (  
                <th key={index}>
                  {keyName.toUpperCase()}
                </th>
              ))
              }
      </tr>
    );
  };
  const tableBody = (resultDat,i) => {
    return (
      <tr className="renderData" key={i}>
        {resultDat && 
          (Object.values(resultDat).map((value, index) =>
            Array.isArray(value) ? (
              value.map((e,i) => {
                return (
                  <React.Fragment key={i}>
                    {tableHead(e)}
                    {tableBody(e,i)}
                  </React.Fragment>
                );
              })
            ) : (
              <td key={index}>
                <> {value}</>
              </td>
            )
          ))}
      </tr>
    );
  };
  return (
    <div className="renderData">
      <table border="1">
        {<thead>{resultData && Array.isArray(resultData)?resultData.map((rData,index)=> tableHead(rData,index)) :tableHead(resultData)}</thead>}
        {<tbody>{resultData && Array.isArray(resultData)?resultData.map((rData,index)=>tableBody(rData,index)) :tableBody(resultData)}</tbody> }
      </table>
    </div>
  );
};

export default CustomTable;
