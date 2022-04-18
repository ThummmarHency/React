import React,{useState,useEffect} from 'react'
import { useQuery ,useMutation,useQueryClient}from "react-query";
import { useParams } from 'react-router-dom'
import axios from "axios";

const DemoUpdate = () => {
  const stuId=useParams()
  
  const fetchData = () => {
    return axios.get(`http://localhost:4000/data`);
  };
  const updateData=(student)=>{
    return axios.put(`http://localhost:4000/data/${stuId.stuId}`,student)
  }
  const {isLoading,data,isError,error}=useQuery(['get-page'],fetchData)
  useEffect(() => {
    setName(data?.data[stuId.stuId-1].name)
    setStatus(data?.data[stuId.stuId-1].status)
  },[data])

  const [name, setName] = useState()
  const [status,setStatus] = useState()

  const {mutate:updateStudent}=useMutation(updateData)
  console.log('data?.data', data?.data)
  if(isLoading){
    return <h2 className="renderData"><div className="loading"></div> </h2>
}
if(isError){
    return <h2 className="renderData">{error.message}</h2>
}
    const handleChange=()=>{
    const student={name,status}
    console.log('student', student)
    updateStudent(student)
    alert("Data updated successfully")
    window.location="../RQ-demo"
}
  return (
    <div className="renderData">
       Name: <input type="text" value={name || ""} onChange={(e)=>setName(e.target.value)} />
       Status: <input type="text" value={status || ""} onChange={(e)=>setStatus(e.target.value)} />
       <button onClick={handleChange}>Update Student</button>
    </div>
  )
}

export default DemoUpdate