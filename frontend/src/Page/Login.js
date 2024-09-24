import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // const Login = (event) =>{
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const data = Object.fromEntries(formData.entries());
  //   axios
  //     .post("http://localhost:56733/addstudent", newStudent)
  //     //เมื่อทำการ response จะเข้า then ถ้าไม่ก็จะไปเข้าcatch
  //     .then((response) => {
  //       console.log(response.data);
  //       alert("Data sent successfully");

  //       navigate("/admin");
  //     })
  //     .catch((error) => {
  //       console.error("There was an error sending the data!", error);
  // //     });
  // } 

  return (
    <div className="container">
      <div className="item">
        {/* Right Side */}
        <div className="contact">
          {/* Add more content as needed */}
        </div>
        {/* Left Side */}
        <div className="submit-form">
          <form onSubmit={Login}>
            <div>
              <p className="cs">cs cmu</p><br />
              <p className="hello">Hello,<br />
              Welcome !</p><br />
              <div className="inputt">
                <label>username</label><br />
                <input type="text" classname="username" placeholder="example@cmu.ac.th" /><br />
                <label className="font-bold">password</label><br />
                <input  type="password" classname="password" placeholder="password"></input><br />
                <input type="checkbox" /> Remember Me<br /><br />
                <center>
                <button className="submit">
                      <Link to="/home">
                      LOG IN
                      </Link>
                </button>
                </center>
              <br /><br />
              </div>
              
              </div>
            </form>
           
        </div>
      </div>
    </div>
  );
};
