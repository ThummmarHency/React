import React from "react";
import { Link, Outlet } from "react-router-dom";

const SDashBoard = () => {
  return (
    <div>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="all-exam">All exam</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default SDashBoard;
