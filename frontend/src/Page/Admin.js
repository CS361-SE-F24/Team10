import "../css/Admin.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Admin = () => {
  const [students, setStudents] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);      // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:56733/data");
        setStudents(response.data);  // Corrected to access 'response.data'
        setLoading(false);           // Stop loading once data is fetched
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Degree</th>
            <th>Progress</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
