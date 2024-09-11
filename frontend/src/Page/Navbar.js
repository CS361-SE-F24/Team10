// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/addstudent">Addstudent</Link>
        </li>
      </ul>
    </nav>
  );
};
