import React from 'react'
import { Link,Outlet} from 'react-router-dom'
const DashBoard = () => {
 
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
            <li>
                <Link to="RQ-student-data">RQ-Student Data</Link>
            </li>
            <li>
                <Link to="axios-fetch">Using Axios</Link>
            </li>
            <li>
                <Link to="RQ-paginated">RQ-paginated</Link>
            </li>
            <li>
                <Link to="RQ-infinite">RQ-Infinite</Link>
            </li>
            <li>
                <Link to="RQ-mutation">RQ-Mutation</Link>
            </li>
            <li>
                <Link to="RQ-demo">RQ-Demo</Link>
            </li>
          </ul>
        </div>
        
        <Outlet/>
    </div>
  )
}

export default DashBoard