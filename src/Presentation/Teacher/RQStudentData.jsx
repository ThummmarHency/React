import React from 'react'
import { useQuery } from "react-query";
import axios from 'axios';
import {getToken} from "../../Container/DataLogic"

const RQStudentData = () => {
    const {isLoading,data,isError,error,isFetching,refetch}=useQuery('get',()=>{
        return axios
          .get(process.env.REACT_APP_API+`/dashboard/Teachers`, {
            headers: { "access-token": `${getToken}` },
          })
    },{cacheTime:3000,refetchOnMount:false,refetchInterval:true,enabled:false})
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
            return dt.status==="Pending" && <div key={dt._id}>{dt.name}</div>
        })}
    </div>
  )
}

export default RQStudentData