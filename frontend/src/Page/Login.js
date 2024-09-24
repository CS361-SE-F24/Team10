import { React, useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div className="contact"></div>
        <div className="submit-form">
          <h4>Login Here</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <br />
              <input type="email" name="email" required />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input type="password" name="password" required />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Logout = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Reset current user and navigate to login page
  setCurrentUser({ id: 0, isAdmin: false });
  navigate("/login");

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};