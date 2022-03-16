import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../Container/DataLogic";

const CustomTable = ({ api }) => {
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
  console.log("resultData :>> ", resultData);

  const tableHead = (resultData) => {
    return (
      <tr className={`border`}>
        {resultData &&
             Object.keys(resultData).map((keyName, index) => (
                <th className={`border`} key={index}>
                  {keyName.toUpperCase()}
                </th>
              ))}
      </tr>
    );
  };
  //   console.log('object :>> ', Array.isArray(resultData));
  const tableBody = (resultDat) => {
    return (
      <tr className="renderData">
        {resultDat && 
          (Object.values(resultDat).map((value, index) =>
            Array.isArray(value) ? (
              value.map((e) => {
                return (
                  <React.Fragment key={index}>
                    {tableHead(e)}
                    {tableBody(e)}
                  </React.Fragment>
                );
              })
            ) : (
              <td className={`border`} key={index}>
                <> {value}</>
              </td>
            )
          ))}
      </tr>
    );
  };
  return (
    <div className="renderData">
      <table>
        <thead>{resultData && Array.isArray(resultData)?resultData.map((rData)=>tableHead(rData)) :tableHead(resultData)}</thead>
        <tbody>{resultData && Array.isArray(resultData)?resultData.map((rData)=>tableBody(rData)) :tableBody(resultData)}</tbody>
      </table>
    </div>
  );
};

export default CustomTable;
