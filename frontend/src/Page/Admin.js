import "../css/Admin.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Admin = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:56733/data");
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleView = (stdID) =>{
    navigate('/', { state: { stdID } });
  }

  // Function to handle edit
  const handleEdit = (stdID) => {
  navigate('/studentfix', { state: { stdID } }); // Using state to pass stdID
};


  // Function to handle delete
  const handleDelete = (stdID) => {
    // Add delete functionality here (e.g., API call to delete student)
    console.log(`Delete student with ID: ${stdID}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      <div className="contain">
        <button onClick={() => navigate("/addstudent")}>เพิ่มนักศึกษา</button>
      </div>
      <div className="contain">
        <button onClick={() => navigate("/addcourse")}></button>
        <button onClick={() => navigate("/alladmin")}>รวม admin</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Degree</th>
            <th>Progress</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.no}>
              <td>{student.no}</td>
              <td>{student.name}</td>
              <td>{student.stdID}</td>
              <td>{student.degree}</td>
              <td>{student.progress}</td>
              <td>
                <div>
                  <button onClick={() => handleView(student.stdID)}>view</button>
                  <button onClick={() => handleEdit(student.stdID)}>edit</button>
                  <button onClick={() => handleDelete(student.stdID)}>delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
