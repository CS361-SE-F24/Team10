// App.js
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { Home } from "./Page/home";
import { Navbar } from "./Page/Navbar"; // นำเข้า Navbar
import { Login, Logout } from "./Page/Login";
import { Addadmin } from "./Page/Addadmin";
import { Addstudent } from "./Page/Addstudent";
import { StudentFixinformation } from "./Page/StudentFix";
import { TestSend } from "./Page/Test_send_email";
import { Admin } from "./Page/Admin";
import { Data } from "./Page/Data";
import { ProgressBar } from "./Page/progressbar";
import { Alladmin } from "./Page/Alladmin";

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : { id: 0, isAdmin: false };
  });

  useEffect(() => {
    if (currentUser.id === 0 && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [currentUser, location.pathname, navigate]);

  useEffect(() => {
    if (currentUser.id !== 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser"); 
    }
  }, [currentUser]);

  return (
    <>
      {location.pathname !== "/login" && (
        <Navbar user={currentUser} setCurrentUser={setCurrentUser} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addstudent" element={<Addstudent />} />
        <Route path="/addadmin" element={<Addadmin />} />
        <Route path="/studentfix" element={<StudentFixinformation stdID={null} />} />
        <Route path="/test" element={<TestSend />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/logout" element={<Logout setCurrentUser={setCurrentUser} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/data" element={<Data />} />
        <Route path="/progressbar" element={<ProgressBar />} />
        <Route path="/alladmin" element={<Alladmin />} />
      </Routes>
    </>
  );
}

export default App;
