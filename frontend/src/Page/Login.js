import React from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const Login = (event) =>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    axios
      .post("http://localhost:56733/addstudent", newStudent)
      //เมื่อทำการ response จะเข้า then ถ้าไม่ก็จะไปเข้าcatch
      .then((response) => {
        console.log(response.data);
        alert("Data sent successfully");

        navigate("/admin");
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  } 

  return (
    <div className="container">
      <div className="item">
        {/* Right Side */}
        <div className="contact">
          <p>Your contact information here</p>
          {/* Add more content as needed */}
        </div>
        {/* Left Side */}
        <div className="submit-form">
          <h4>Login Here</h4>
          <form onSubmit={Login}>
            <div>
              <label>Login</label>
              <br />
              <input type="email" name="email" />
            </div>
            <div>
              <label>password</label>
              <br />
              <input type="text" name="password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
