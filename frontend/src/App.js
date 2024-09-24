import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { Home } from "./Page/home";
import { Navbar } from "./Page/Navbar";
import { Login, Logout } from "./Page/Login";
import { Addadmin } from "./Page/Addadmin";
import { Addstudent } from "./Page/Addstudent";
import { StudentFixinformation } from "./Page/StudentFix";
import { TestSend } from "./Page/Test_send_email";
import { Admin } from "./Page/Admin";
import { Data } from "./Page/Data";
import { ProgressBar } from "./Page/progressbar";

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  // Retrieve from localStorage if exists
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : { id: 0, isAdmin: false };
  });

  console.log(currentUser);

  useEffect(() => {
    // Redirect to login if currentUser is 0 and not on the login page
    if (currentUser.id === 0 && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [currentUser, location.pathname, navigate]);

  useEffect(() => {
    // Save currentUser to localStorage whenever it changes
    if (currentUser.id !== 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser"); // Clear when logged out
    }
  }, [currentUser]);

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addstudent" element={<Addstudent />} />
        <Route path="/addadmin" element={<Addadmin />} />
        <Route
          path="/studentfix"
          element={<StudentFixinformation stdID={null} />}
        />
        <Route path="/test" element={<TestSend />} />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/logout"
          element={<Logout setCurrentUser={setCurrentUser} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/data" element={<Data />} />
        <Route path="/progressbar" element={<ProgressBar />} />
      </Routes>
    </>
  );
}

export default App;
