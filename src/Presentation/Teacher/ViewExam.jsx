import React,{ useState,useEffect} from 'react'
import {fetchDataGet} from '../../Container/DataLogic'
const ViewExam = () => {
    const [rows,setRows]=useState([])

    useEffect(() => {
        fetchDataGet("/dashboard/Teachers/viewExam",setRows)
        console.log(rows);
        return () => {
          setRows([]);
        };
      }, []);
  return (
    <div className="renderData">
        

    </div>
  )
}

export default ViewExam