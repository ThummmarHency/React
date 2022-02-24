import React from 'react'
import { Link,Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
       
          <Link to="login">Login</Link>   
          <Link to="Signup">Signup</Link> 
          <Link to="login">Logout</Link> 
          <hr />    
          <Outlet/>
         
    </div>
  )
}

export default Navbar