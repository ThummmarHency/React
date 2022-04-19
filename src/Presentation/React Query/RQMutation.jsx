import React,{ useState} from 'react'
import { useQuery ,useMutation,useQueryClient}from "react-query";
import axios from "axios";
import {Link} from "react-router-dom"
const fetchData = () => {
  return axios.get(`http://localhost:4000/data`);
};
const addData=(student)=>{
     return axios.post(`http://localhost:4000/data`,student)
}
const RQMutation = () => {
    const [name, setName] = useState('')
    const [status,setStatus] = useState('')
    const {isLoading,data,isError,error,refetch}=useQuery(['get-page'],fetchData,
    )
    const queryClient=useQueryClient()
    const {mutate:addStudent}=useMutation(addData,{
        // onSuccess: (data)=>{
            // queryClient.invalidateQueries('get-page')
        //     queryClient.setQueryData('get-page',(oldQueryData)=>
        //     {return  {...oldQueryData,
        //     data:[...oldQueryData.data,data.data]}})
        // }
        onMutate: async (newStudent)=>{
           await queryClient.cancelQueries('get-page')
           const prevStuData=queryClient.getQueryData('get-page')
            queryClient.setQueryData('get-page',(oldQueryData)=>
            {return  {...oldQueryData,
            data:[...oldQueryData.data,{id:oldQueryData?.data?.length+1,...newStudent}]}})
                return{
                    prevStuData 
                }
        },
        onError:(_error,_student,context)=>{
            queryClient.setQueryData('get-page',context.prevStuData)
        },
        onSettled:()=>{
            queryClient.invalidateQueries('get-page')
        }
    })
    if(isLoading){
        return <h2 className="renderData"><div className="loading"></div></h2>
    }
    if(isError){
        return <h2 className="renderData">{error.message}</h2>
    }
    const handleChange=()=>{
        const student={name,status}
        addStudent(student)
    }
  return (
    <div className="renderData">
       Name: <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
       Status: <input type="text" value={status} onChange={(e)=>setStatus(e.target.value)} />
       <button onClick={handleChange}>Add Student</button>
       <button onClick={refetch}>Fetch Student</button>
       {data?.data.map((stuData)=>{
           return(
               <div key={stuData.id}>
                   <Link to={`/teacher-dashboard/RQ-student-data/${stuData.id}`}>{stuData.name}</Link>
               </div>
           )
       })}
    </div>
  )
}

export default RQMutation