import React from 'react'
import {RQHook} from "./RQHook"
import {Link} from "react-router-dom"
const RQStudentData = () => {
 
    const {isLoading,data,isError,error,isFetching,refetch}=RQHook(`http://localhost:4000/data`)
    if(isLoading){
        return <h2 className="renderData"><div className="loading"></div> </h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
  return (
    <div className="renderData">
        {/* <button onClick={refetch}>Fetch Data</button> */}
  
        {data?.data.map((dt)=>{
          return  <div key={dt.id}>
            <Link to={`/teacher-dashboard/RQ-student-data/${dt.id}`}>{dt.name}</Link>
            </div>
        })}
      
    </div>
  )
}

export default RQStudentData