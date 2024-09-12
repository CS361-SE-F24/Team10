import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Addstudent.css";

export const Addstudent = () => {
  const [studentName, setStudentName] = useState("");

  const AddNewStudent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStudent = Object.fromEntries(formData.entries());
    // console.log(formEntries);
    axios
      .post("http://localhost:56733/addstudent", newStudent)
      //เมื่อทำการ response จะเข้า then ถ้าไม่ก็จะไปเข้าcatch
      .then((response) => {
        console.log(response.data);
        alert("Data sent successfully");
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div className="Addstudent">
      <form onSubmit={AddNewStudent}>
        <div>
          <label>Full Name: </label>
          <input type="text" name="name" defaultValue="" />
        </div>
        <div>
          <label>Student ID: </label>
          <input type="text" name="stdID" defaultValue="" />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" defaultValue="" />
        </div>
        <div>
          <label>Tel: </label>
          <input type="text" name="phone" defaultValue="" />
        </div>
        <div>
          <label>Degree: </label>
          <input type="text" name="degree" defaultValue="" />
        </div>
        <div>
          <label>Teacher Advisor: </label>
          <input type="text" name="advisor" defaultValue="" />
        </div>

        <div>
          <label>Email Teacher advisor: </label>
          <input type="email" name="email_advisor" defaultValue="" />
        </div>
        <button type="submit">SubmiTS</button>
      </form>
    </div>
  );
};
