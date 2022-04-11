import React,{useState} from 'react'
import { fetchDataPut } from '../../Container/DataLogic'
const EditProfile = () => {
    const [name,setName]=useState({name:""})
    const ChangeProfile=()=>{
        fetchDataPut("/student/studentProfile",name)
    }
  return (
    <div className="renderData">
        <h2>Edit Profile</h2>
        <label>Name</label>: <input type="text" onChange={(e)=>setName({name: e.target.value})} placeholder="Enter Name"/>
        <button onClick={ChangeProfile}>Change</button>
    </div>
  )
}

export default EditProfile