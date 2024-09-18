// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"

export const Navbar = () => {
  return (
    <div>
      {/* Navbar อันแรก */}
      <div className="navbar">
        <div className="brand">
          <Link to="/home">HOME</Link>
          <Link to="/blog">BACK</Link>
        </div>
        <div>
          <Link to="/">LOGOUT</Link>
        </div>
      </div>
      
      {/* Navbar อันที่สอง */}
      <div className="navbar-second">
        <div className="menu">
            COMPUTER SCIENCE CMU<br />
            STUDENT PROGRESS TRACKING SYSTEM
          {/* <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/help">Help</Link> */}
        </div>
      </div>
    </div>
  );
};
