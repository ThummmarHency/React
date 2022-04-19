import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DemoUpdate = () => {
  const stuId = useParams();
  const navigate = useNavigate();
  const fetchData = () => {
    return axios.get(`http://localhost:4000/data`);
  };
  const updateData = (student) => {
    return axios.put(`http://localhost:4000/data/${stuId.stuId}`, student);
  };
  const { isLoading, data, isError, error } = useQuery(["get-page", parseInt(stuId.index)], fetchData);
  useEffect(() => {
    setName(
      data?.data[data?.data.map((e) => e.id).indexOf(parseInt(stuId.stuId))]
        .name || ""
    );
    setStatus(
      data?.data[data?.data.map((e) => e.id).indexOf(parseInt(stuId.stuId))]
        .status || ""
    );
  }, [data]);

  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const queryClient = useQueryClient();

  const { mutate: updateStudent } = useMutation(
    updateData,
    //   { onMutate: async (newStudent)=>{
    //     await queryClient.cancelQueries('get')
    //     const prevStuData=queryClient.getQueryData('get')
    //      queryClient.setQueryData('get',(oldQueryData)=>
    //      {return  {...oldQueryData,
    //      data:[...oldQueryData.data,{...newStudent}]}})
    //          return{
    //              prevStuData
    //          }
    //  },
    //  onError:(_error,_student,context)=>{
    //      queryClient.setQueryData('get',context.prevStuData)
    //  },
    //  onSettled:()=>{
    //      queryClient.invalidateQueries('get')
    //  }}
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-page", parseInt(stuId.index)]);
      },
    }
  );

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
  const handleChange = () => {
    const student = { name, status };
    console.log("student", student);
    updateStudent(student);
    navigate(`/teacher-dashboard/RQ-demo`);
  };
  return (
    <div className="renderData">
      Name:
      <input
        type="text"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      Status:
      <input
        type="text"
        value={status || ""}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleChange}>Update Student</button>
    </div>
  );
};

export default DemoUpdate;
