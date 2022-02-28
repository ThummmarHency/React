import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

const Navbar = () => {
  let naviGate = useNavigate();

  useEffect(() => {
    localStorage.getItem("isAuthenticated") && naviGate("../dashboard")

  }, []);

  return (
    <div>
      {localStorage.getItem("isAuthenticated") ? (
        <>
          <Link to="logout">Logout</Link>

        </>
      ) : (
        <>
          <Link to="login">Login</Link> &nbsp;&nbsp;
          <Link to="signup">SignUp</Link> &nbsp;&nbsp;
        </>
      )}
      <hr />
      <Outlet />
    </div>
  );
};

export default  Navbar;
