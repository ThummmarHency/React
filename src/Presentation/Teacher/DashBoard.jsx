import React,{useEffect} from 'react'
import axios from 'axios'
const DashBoard = () => {

    useEffect(async (e) =>{
        const res=await axios.get(
            process.env.REACT_APP_API+'/dashboard/Teachers'
        )
        console.log(res.data);
    })
  return (
    <div>


    </div>
  )
}

export default DashBoard