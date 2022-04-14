import React from 'react'
import {getToken} from "../../Container/DataLogic"
import {RQHook} from "./RQHook"
import {Link} from "react-router-dom"
const RQStudentData = () => {
    const {isLoading,data,isError,error,isFetching,refetch}=RQHook(process.env.REACT_APP_API + `/dashboard/Teachers`,getToken)
    if(isLoading || isFetching){
        return <h2 className="renderData"><div className="loading"></div> </h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
    // console.log('data', data)
  return (
    <div className="renderData">
        <button onClick={refetch}>Fetch Data</button>
       
        {data?.data?.data.map((dt)=>{
          return dt.status==="Pending" && <div key={dt._id}>
            <Link to={`/teacher-dashboard/RQ-student-data/${dt._id}`}>{dt.name}</Link>
            </div>
        })}
      
    </div>
  )
}

export default RQStudentData