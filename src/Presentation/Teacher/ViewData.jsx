import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {fetchDataGet} from '../../Container/DataLogic'
const ViewData = () => {
  const [resultData, setResultData] = useState();
  const location = useLocation();
  let SearchToken = new URLSearchParams(location.search);
  let id = SearchToken.get("id");

  useEffect(() => {
    fetchDataGet(`/dashboard/Teachers/viewStudentDetail?id=${id}`,undefined,undefined,setResultData);
    return () => {
      setResultData([]);
    };
  }, []);

  return (
    <div>
      <div className="renderData">
        <h2>Student Data:</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {resultData && (
              <tr>
                <td>{resultData._id}</td>
                <td>{resultData.name}</td>
                <td>{resultData.email}</td>
              </tr>
            )}
          </tbody>
        </table>
        <h2>Student Result:</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Subject Name</th>
              <th>Score</th>
              <th>rank</th>
              <th>Result Status</th>
            </tr>
          </thead>
          <tbody>
            {resultData ? (
              resultData.Result &&
              resultData.Result.map((element) => {
                return resultData.Result !== 0 ? (
                  <React.Fragment key={element._id}>
                    <tr>
                      <td>{element._id}</td>
                      <td>{element.subjectName}</td>
                      <td>{element.score}</td>
                      <td>{element.rank}</td>
                      <td>{element.resultStatus}</td>
                    </tr>
                  </React.Fragment>
                ) : (
                  <tr>
                    <td> Exam pending</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewData;
