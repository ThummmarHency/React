import React,{ useState} from 'react'
import { useQuery }from "react-query";
import axios from "axios";
const fetchData = (index) => {
  return axios.get(`http://localhost:4000/data?_limit=2&_page=${index}`);
};
const RQPaginated = () => {
    const [index, setIndex] = useState(1)
    const {isLoading,data,isError,error,isFetching}=useQuery(['get-page',index],()=>fetchData(index),
    {keepPreviousData:true})
    if(isLoading){
        return <h2 className="renderData"><div className="loading"></div> </h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
  return (
    <div className="renderData">
        {data?.data.map((dt)=>{
          return <div key={dt.id}>
            <h2>{dt.id}. {dt.name}</h2>
            </div>
        })}
            <div>
            <button onClick={()=>setIndex(index-1)} disabled={index===1}>Prev page</button>
            <button onClick={()=>setIndex(index+1)} disabled={index===6}>Next page</button>

            </div>

            {isFetching && "loading..."}

    </div>
  )
}

export default RQPaginated