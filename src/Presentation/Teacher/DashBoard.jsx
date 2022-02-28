import React  from 'react'
import { Link,Outlet} from 'react-router-dom'
const DashBoard = () => {
   
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
            
          </ul>
        </div>
        <Outlet/>
    </div>
  )
}

export default DashBoard