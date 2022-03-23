import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../Container/DataLogic";

const CustomTable = ({api}) => {
  const [resultData, setResultData] = useState();
  const location = useLocation();
  let SearchId = new URLSearchParams(location.search);
  let id = SearchId.get("id");
  console.log('id :>> ', id);
  useEffect(() => {
   fetchDataGet(`${api}?id=${id}`, undefined, undefined, setResultData);
    return () => {
      setResultData([]);
    };
  }, []);
  console.log("resultData :>> ", resultData);

  const tableHead = (resultDat) => {
    return (
      <tr>
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
  const tableBody = (resultDat) => {
    return (
      <tr className="renderData">
        {resultDat && 
          (Object.values(resultDat).map((value, index) =>
            Array.isArray(value) ? (
              value.map((e,i) => {
                return (
                  <React.Fragment key={i}>
                    {tableHead(e)}
                    {tableBody(e)}
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
        {<thead>{resultData && Array.isArray(resultData)?resultData.map((rData)=>tableHead(rData)) :tableHead(resultData)}</thead>}
        {<tbody>{resultData && Array.isArray(resultData)?resultData.map((rData)=>tableBody(rData)) :tableBody(resultData)}</tbody> }
      </table>
    </div>
  );
};

export default CustomTable;
