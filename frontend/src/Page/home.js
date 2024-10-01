import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import '../css/home.css';
import axios from "axios";
import { ProgressBar } from '../Page/progressbar.js';
import DonutChart from '../Page/DonutChart.js';


export const Home = (props) => {
  const location = useLocation();
  
  // First, try to get stdID from the route state, then from props, then from localStorage
  const stdID = location.state?.stdID || props.stdID || localStorage.getItem("stdID") || "";

  // Get currentUser from props or localStorage
  const currentUser = props.currentUser || JSON.parse(localStorage.getItem("currentUser")) || { id: 0, isAdmin: false };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    stdID: stdID,
    tel: '',
    email: '',
    degree: '',
    advisor: '',
    email_advisor: '',
    image: null,
  });

  useEffect(() => {
    // Store stdID in localStorage if not already there
    if (stdID && !localStorage.getItem("stdID")) {
      localStorage.setItem("stdID", stdID);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:56733/currentstudent?stdID=${stdID}`);
        console.log(response.data);
        const studentData = response.data;
        setFormData({
          name: studentData.name || '',
          stdID: stdID,
          tel: studentData.tel || '',
          email: studentData.email || '',
          degree: studentData.plan || '',
          advisor: '',
          email_advisor: '',
          image: null,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [stdID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      <div className="sidebar">
        <h4>PhD Student</h4>
        <div className="rec">
          <div className="inside">
            <h3>รูป</h3>
            <p>{formData.name}</p>
            <p>รหัสนักศึกษา {formData.stdID}</p>
            <hr />
            <p>{formData.degree}</p>
          </div>
        </div>
        <br />
        <div className="advisor">Advisor: {formData.advisor || "Not available"}</div>
        <div className="email">Email of Advisor: {formData.email_advisor || "Not available"}</div>

        {/* Example conditional rendering based on currentUser */}
        {currentUser.isAdmin ? (
          <div>
            {/* <div>User is Admin</div> */}
            <button>edit progress</button>
          </div>
        ) : (
          <></>
          // <div>User is not Admin</div>
        )}
      </div>

      <div className="progressbar">
        <ProgressBar />
      </div>
      <div>
        {/* <DonutChart /> */}
        {/* <DonutChart progress={progressPercentage} /> */}
      </div>
    </div>
  );
};
