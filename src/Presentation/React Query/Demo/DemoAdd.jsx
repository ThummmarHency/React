import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DemoAdd = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const fetchData = () => {
    return axios.get(`http://localhost:4000/data`);
  };
  const addData = (student) => {
    return axios.post(`http://localhost:4000/data/`, student);
  };
  const queryClient = useQueryClient();
  const { error } = useQuery("get", fetchData);
  const { mutate: addStudent } = useMutation(addData, {
    onSuccess: () => {
      queryClient.invalidateQueries("get");
    },
  });
  if (error) {
    <div className="renderData">{error.message} </div>;
  }
  const handleChange = () => {
    const student = { name, status };
    console.log("student", student);
    addStudent(student);
    navigate(`/teacher-dashboard/RQ-demo`);
  };
  return (
    <div className="renderData">
      Name:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Status:
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleChange}>Add Student</button>
    </div>
  );
};

export default DemoAdd;
