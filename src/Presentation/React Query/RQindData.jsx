import React from 'react'
import { RQIndHook } from './RQHook'
import { useParams } from 'react-router-dom'

const RQindData = () => {
    const stuId=useParams()
    const {isLoading,data,isError,error,isFetching}= RQIndHook(`http://localhost:4000/data/`,stuId.stuId)
    if(isLoading || isFetching){
        return <h2 className="renderData"><div className="loading"></div> </h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
    return <div className="renderData"> <h2> {data?.data.id} - {data?.data.name}    </h2></div>
}

export default RQindData