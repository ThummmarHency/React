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
                <Link to="student-data">Student Data</Link>
            </li>
            <li>
                <Link to="verified-data">Verify student data</Link>
            </li>
            <li>
                <Link to="create-exam">Create Exam</Link>
            </li>
            <li>
                <Link to="view-exam">View Exam</Link>
            </li>
          </ul>
        </div>
        
        <Outlet/>
    </div>
  )
}

export default DashBoard