import React from 'react'
import { RQIndHook } from './RQHook'
import { useParams } from 'react-router-dom'
import {getToken} from "../../Container/DataLogic"

const RQindData = () => {
    const stuId=useParams()
    const {isLoading,data,isError,error,isFetching}= RQIndHook(process.env.REACT_APP_API + `/dashboard/Teachers/viewStudentDetail?id=`,getToken,stuId.stuId)

    if(isLoading || isFetching){
        return <h2 className="renderData"><div className="loading"></div> </h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
    return <div className="renderData">{data?.data?.data[0]._id} - {data?.data?.data[0].name}</div>
}

export default RQindData