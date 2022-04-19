import React, { useState, useEffect } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RQDemo = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [header, setHead] = useState([]);
  const [index1, setIndex] = useState(1);
  const fetchData = () => {
    return axios.get(`http://localhost:4000/data?_limit=4&_page=${index1}`);
  };
  const { data:getData} = useQuery("get", ()=>axios.get(`http://localhost:4000/data`));
  const { isLoading, data, isError, error } = useQuery(
    ["get-page", index1],
    () => fetchData(),{keepPreviousData:true}  );

  useEffect(() => {
    id && delStudent(id);
  }, [id]);
  useEffect(() => {
    data?.data.map((e) =>
      Object.keys(e).map((key) => setHead((old) => [...old, key]))
    );
  }, [data]);
  const rmvDupObj = header.filter((item, i, ar) => ar.indexOf(item) === i);
  const DltData = () => {
    return axios.delete(`http://localhost:4000/data/${id}`);
  };
  const queryClient = useQueryClient();
  const { mutate: delStudent } = useMutation(DltData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-page", index1]);
    },
  });

  if (isLoading) {
    return (
      <h2 className="renderData">
        <div className="loading"></div>
      </h2>
    );
  }
  if (isError) {
    return <h2 className="renderData">{error.message}</h2>;
  }
  return (
    <div className="renderData">
      <div>
        <button onClick={() => navigate("/teacher-dashboard/demo-add")}>
          Add Data
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {rmvDupObj.map((head, i) => {
              return <td key={i}>{head}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.values(data?.data).map((trow, index) => (
            <tr key={index}>
              {rmvDupObj.map((h1, index1) => (
                <td key={index1}>
                  {trow[h1] === (undefined || "") ? "-" : trow[h1]}
                </td>
              ))}
              <td>
                <button
                  onClick={() =>
                    navigate(`/teacher-dashboard/demo-update/${trow.id}/${index1}`)
                  }
                >
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => setId(trow.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => setIndex(index1 - 1)} disabled={index1 === 1}>
          Prev page
        </button>
        <button onClick={() => setIndex(index1 + 1)} disabled={Math.ceil(getData?.data.length/4)===index1}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default RQDemo;
