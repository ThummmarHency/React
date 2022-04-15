import React, { Fragment } from 'react'
import { useInfiniteQuery }from "react-query";
import axios from "axios";
const fetchData = ({pageParam=1}) => {
  return axios.get(`http://localhost:4000/data?_limit=2&_page=${pageParam}`);
};
const RQInfinite = () => {
    const {isLoading,data,isError,error,isFetching,isFetchingNextPage,hasNextPage,fetchNextPage}=useInfiniteQuery('page-infinite',fetchData,
    {getNextPageParam:(_lastPage,pages)=>{
            if(pages.length<7){
                return pages.length+1
            }else{
                return undefined
            }
    },staleTime:3000})
    if(isLoading){
        return <h2 className="renderData"><div className="loading"></div> </h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
    console.log('data', data)
  return (
    <div className="renderData">
        {data?.pages.map((group,index)=>{
          return (<Fragment key={index}>
              {
                group.data.map((data,i)=>
                    <h2 key={i}>{data.id}.{data.name} </h2>
                )

              }
            </Fragment>)
        })}
            <div>
            <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>

            </div>

            {isFetching && !isFetchingNextPage ? "Fetching...": null}

    </div>
  )
}

export default RQInfinite