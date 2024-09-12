import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Home } from "./Page/home";
// import { Addstudent } from "./Page/Addstudent";
import { Navbar } from "./Page/Navbar"; // Make sure to adjust the import path based on your folder structure
import { Login } from "./Page/Login";
import {Addadmin} from "./Page/Addadmin";
import { Addstudent } from "./Page/Addstudent";
import {StudentFixinformation} from "./Page/StudentFix"; 
import { TestSend } from "./Page/Test_send_email";

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // Use the hook to get the current path

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/addstudent" element={<Addstudent />} />
        <Route path="/addadmin" element={<Addadmin />} />
        <Route path="/studentfix" element={<StudentFixinformation />} />
        {/* Define the route for the root path if needed */}
        <Route path="/test" element={<TestSend />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
