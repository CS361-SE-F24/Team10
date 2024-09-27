// Navbar.js
import {React,useState} from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : { id: 0, isAdmin: false };
  });

  // console.log(currentUser);
  return (
    <div>
      {/* Navbar อันแรก */}
      <div className="navbar">
        <div className="brand">
          {currentUser.isAdmin ? <Link to="/admin">HOME</Link>:<Link to="/">HOME</Link>}
          {/* <Link to="/">HOME</Link> */}
          <Link to="/blog">BACK</Link>
        </div>
        <div>
          <Link to="/logout">LOGOUT</Link>
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
