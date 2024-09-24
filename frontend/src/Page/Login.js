import { React, useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    axios
      .post("http://localhost:56733/login", data)
      .then((response) => {
        alert("Login successful");

        // Set the currentUser with both ID and isAdmin status
        setCurrentUser({
          id: response.data.currentUser,
          isAdmin: response.data.isAdmin,
        });

        // Navigate based on user role
        if (response.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/", { state: { stdID: response.data.stdID } });
        }
      })
      .catch((error) => {
        setError("Invalid login credentials");
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div className="container">
      <div className="item">
        {/* Right Side */}
        <div className="contact">
          {/* Add more content as needed */}
        </div>

        {/* Left Side */}
        <div className="submit-form">
          <form onSubmit={handleSubmit}>
            <div>
              <p className="cs">cs cmu</p>
              <p className="hello">Hello,<br />Welcome!</p>
              <br />
              <div className="inputt">
                <label>Username</label>
                <br />
                <input type="text" className="username" placeholder="example@cmu.ac.th" required />
                <br />
                <label className="font-bold">Password</label>
                <br />
                <input type="password" className="password" placeholder="password" required />
                <br />
                <input type="checkbox" /> Remember Me
                <br />
                <br />
                <center>
                  <button type="submit" className="submit">LOG IN</button>
                </center>
                <br />
                <br />
              </div>
            </div>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export const Logout = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = () => {
    // Reset current user and navigate to login page
    setCurrentUser({ id: 0, isAdmin: false });
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
