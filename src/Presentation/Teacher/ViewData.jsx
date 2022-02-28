import React, { useState, useEffect } from "react";
import axios from "axios";
import { token1 } from "./ShowStudentData";
import { useLocation } from "react-router-dom";

const ViewData = () => {
  const [resultData, setResultData] = useState();

  const location = useLocation();
  let SearchToken = new URLSearchParams(location.search);
  let id = SearchToken.get("id");

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        process.env.REACT_APP_API +
          `/dashboard/Teachers/viewStudentDetail?id=${id}`,
        { headers: { "access-token": `${token1}` } }
      );
      setResultData(res.data.data[0]);
      console.log(res.data.data[0]);
    }
    fetchData();
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
              resultData.Result === [] ? (
                resultData.Result.map((element) => {
                  return (
                    <>
                      <tr key={element._id}>
                        <td>{element._id}</td>
                        <td>{element.subjectName}</td>
                        <td>{element.score}</td>
                        <td>{element.rank}</td>
                        <td>{element.resultStatus}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr><td> Exam pending</td></tr>
              )
            ) : (
              <tr><td>Loading</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewData;
