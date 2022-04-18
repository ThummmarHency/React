import React,{useState} from 'react'
import {RQHook} from "../RQHook"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {useMutation}from "react-query";
import axios from "axios";
const RQDemo = () => {
  const [id, setId] = useState()
  const {isLoading,data,isError,error}=RQHook(`http://localhost:4000/data`)
  const tblHead= []

  const DltStudent=(id)=>{
    setId(id)
    delStudent(null)
  }

  const DltData=()=>{
    return axios.delete(`http://localhost:4000/data/${id}`)
  }
  
  const {mutate:delStudent}=useMutation(DltData)
  data?.data.map((e)=>Object.keys(e).map((a)=>{
  tblHead.push(a)
 }))
 if(isLoading){
  return <h2 className="renderData"><div className="loading"></div> </h2>
}
if(isError){
  return <h2 className="renderData">{error.message}</h2>
}
  return (
    <div className="renderData">
      <div>
        <button onClick={()=>window.location="demo-add"}>Add Data</button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
         {tblHead
         .filter((item, i, ar) => ar.indexOf(item) === i).map((head,i)=>{
         return <td key={i}>{head}</td>
          }) }
          </tr>
        </thead>
        <tbody>
          { Object.values(data?.data).map((trow, index) => (
        <tr key={index}>
          { tblHead
            .filter((item, i, ar) => ar.indexOf(item) === i)
            .map((h1, index1) => (
              <td key={index1}>
                {trow[h1] === (undefined || "") ? "-" : trow[h1]}
              </td>
            ))}
            <td><button onClick={()=>window.location=`demo-update/${trow.id}`}>Update</button></td>
            <td><button onClick={()=>DltStudent}>Delete</button></td>
        </tr>
      ))}
        </tbody>
      </table>
    </div>
  )
}

export default RQDemo