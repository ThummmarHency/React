import React,{ useEffect}  from 'react'
import { Link,Outlet} from 'react-router-dom'
const DashBoard = () => {
   useEffect(()=>{
   },[])
  return (
    <div> 
        <div className="sidebar">
          <ul>
            <li>
                <Link to="studentdata">Student Data</Link>
            </li>
            <li>
                <Link to="verifieddata">Verify student data</Link>
            </li>
            <li>
                <Link to="createexam">Create Exam</Link>
            </li>
          </ul>
        </div>
        
        <Outlet/>
    </div>
  )
}

export default DashBoard