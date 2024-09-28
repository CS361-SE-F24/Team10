import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

// Login Component
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
              <p className="hello">
                Hello,
                <br />
                Welcome!
              </p>
              <br />
              <div className="inputt">
                <label>Username</label>
                <br />
                <input
                  type="email"
                  className="username"
                  placeholder="example@cmu.ac.th"
                  name="email"
                  required
                />
                <br />
                <label className="font-bold">Password</label>
                <br />
                <input
                  type="password"
                  className="password"
                  placeholder="password"
                  name="password"
                  required
                />
                <br />
                <input type="checkbox" /> Remember Me
                <br />
                <br />
                <center>
                  <button type="submit" className="submit">
                    LOG IN
                  </button>
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

// Logout Component
export const Logout = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    // Set the current user to an initial state
    setCurrentUser({ id: 0, isAdmin: false });
    // Navigate to login page after updating currentUser
    navigate("/login");
  }, [setCurrentUser, navigate]); // Dependency array to avoid infinite loop

  return null; // No UI is needed, just a side effect
};
