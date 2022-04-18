import React,{useState} from 'react'
import { useQuery ,useMutation,useQueryClient}from "react-query";
import axios from "axios";
const DemoAdd = () => {
  const [name, setName] = useState('')
  const [status,setStatus] = useState('')

  const fetchData = () => {
    return axios.get(`http://localhost:4000/data`);
  };
  const addData=(student)=>{
       return axios.post(`http://localhost:4000/data/`,student)
  }
  const {error}=useQuery(['get-page'],fetchData)
  const {mutate:addStudent}=useMutation(addData)
  if(error){
      <div className="renderData">{error.message} </div>
  }
  const handleChange=()=>{
    const student={name,status}
    console.log('student', student)
    addStudent(student)
    window.location="RQ-demo"
    alert("Student added successfully")
}
  return (
    <div className="renderData">
       Name: <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
       Status: <input type="text" value={status} onChange={(e)=>setStatus(e.target.value)} />
       <button onClick={handleChange}>Add Student</button>
    </div>
  )
}

export default DemoAdd