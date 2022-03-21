import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataGet } from "../Container/DataLogic";

const CustomTable = ({ api,btn }) => {
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

  const tableHead = (resultDat) => {
    return (
      <tr>
        {resultDat &&
            // Array.isArray(resultDat)? resultDat.map((Key)=>(
            //   Object.keys(Key).map((keyName, index) => (  
            //     <th key={index}>
            //       {keyName.toUpperCase()}
            //     </th>
            //   ))
            // )):
             Object.keys(resultDat).map((keyName, index) => (  
                <th key={index}>
                  {keyName.toUpperCase()}
                </th>
              ))
              }
      </tr>
    );
  };
  //   console.log('object :>> ', Array.isArray(resultData));
  const tableBody = (resultDat) => {
    return (
      <tr className="renderData">
        {/* {console.log('x.constructor.name === "Object" :>> ', resultDat.constructor.name === "Object")} */}
        {resultDat && 
        //  Array.isArray(resultDat)? resultDat.map((Key,index)=>{
        //     <th key={index}>{Key}</th>
        //   })
        //  :
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
          {btn && <button>{btn}</button>}
      </tr>
    );
  };
  return (
    <div className="renderData">
      <table border="1">
        {<thead>{resultData && Array.isArray(resultData)?resultData.map((rData)=>tableHead(rData)) :tableHead(resultData)}</thead>}
        {/* <thead>{tableHead(resultData)}</thead>  */}
        {<tbody>{resultData && Array.isArray(resultData)?resultData.map((rData)=>tableBody(rData)) :tableBody(resultData)}</tbody> }
        {/* <thead>{tableBody(resultData)}</thead>  */}
      </table>
    </div>
  );
};

export default CustomTable;
