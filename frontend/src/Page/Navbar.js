import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export const Navbar = ({ user = { isAdmin: false }, setCurrentUser }) => {
  const navigate = useNavigate();


  const handleLogout = (event) => {
    event.preventDefault(); 
    const confirmed = window.confirm("ยืนยันจะ logout หรือไม่?");
    if (confirmed) {
      setCurrentUser({ id: 0, isAdmin: false });
      navigate("/login"); 
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="brand">
          <Link to={user.isAdmin ? "/admin" : "/"}>HOME</Link>
          <Link to="/blog">BACK</Link>
        </div>
        <div>
          <Link to="#" onClick={handleLogout} className="logout-button">
            LOG OUT
          </Link>
        </div>
      </div>

      <div className="navbar-second">
        <div className="menu">
          COMPUTER SCIENCE CMU<br />
          STUDENT PROGRESS TRACKING SYSTEM
        </div>
      </div>
    </div>
  );
};
