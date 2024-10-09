import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Add.css";

export const StudentFixinformation = (props) => {
  const location = useLocation();
  const stdID = location.state?.stdID || props.stdID || ""; 
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    stdID: stdID,
    tel: '',
    email: '',
    degree: '',
    advisor: '',
    email_advisor: '',
    picture: null, // This will hold the image URL or base64 string
  });

  const navigate = useNavigate(); 

  // Fetch student data from the API
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:56733/currentstudent?stdID=${stdID}`);
      const studentData = response.data;

      // Set form data with fetched student data
      setFormData(prevData => ({
        ...prevData,
        name: studentData.name || '',
        tel: studentData.tel || '',
        email: studentData.email || '',
        degree: studentData.plan || '',
        advisor: studentData.advisor || "",
        email_advisor: studentData.advisor_email || "",
        picture: studentData.picture ? `data:image/jpeg;base64,${studentData.picture}` : null, // Assuming picture is stored as Base64
      }));
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [stdID]);

  // Fetch data when component mounts or stdID changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoadingSubmit(true);  
    setError(null);  

    const requiredFields = ['name', 'tel', 'advisor', 'email_advisor'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        setLoadingSubmit(false);
        return;
      }
    }

    // Prepare data for submission
    const newStudentfix = {
      stdID: formData.stdID,
      name: formData.name,
      tel: formData.tel,
      email: formData.email,
      degree: formData.degree,
      advisor: formData.advisor,
      email_advisor: formData.email_advisor,
      picture: formData.picture ? formData.picture.split(',')[1] : null, // Use base64 if needed
    };

    try {
      await axios.post("http://localhost:56733/studentfix", newStudentfix, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await fetchData();  // Fetch updated data after submission
      navigate("/admin");  
    } catch (error) {
      setError(error.response?.data?.error || "Error updating data. Please try again.");
      console.error("Update error:", error);
    } finally {
      setLoadingSubmit(false);  
    }
  };

  // Handle file input change
  const HandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          picture: reader.result,  // Store the new image as a base64 URL
        }));
      };
      reader.readAsDataURL(file); // Convert the file to base64
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Show loading spinner if data is being fetched
  if (loading) {
    return <div className="loading-screen"><div className="loader"></div></div>;
  }

  return (
    <div className="containers">
      <br />
      {error && <div className="error-message">{error}</div>} 

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="imageUpload">
            <img
              src={formData.picture ? formData.picture : 'pic.png'} // Display existing picture or default image
              className="uploaded-image"
              alt="Student"
              style={{ cursor: 'pointer', width: '200px', height: '200px' }}
            />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={HandleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name</label><br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input_select_text"
          />
        </div>

        {/* Student ID */}
        <div className="form-group">
          <label htmlFor="stdID">Student ID</label><br />
          <input
            type="text"
            id="stdID"
            name="stdID"
            value={formData.stdID}
            readOnly
            className="input_select_text"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="tel">Tel</label><br />
          <input
            type="text"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
            className="input_select_text"
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            className="input_select_text"
          />
        </div>

        {/* Degree Field */}
        <div className="form-group">
          <label htmlFor="degree">Degree</label><br />
          <input
            id="degree"
            name="degree"
            value={formData.degree}
            readOnly
            className="input_select_text"
          />
        </div>

        {/* Advisor Field */}
        <div className="form-group">
          <label htmlFor="advisor">Teacher Advisor</label><br />
          <input
            type="text"
            id="advisor"
            name="advisor"
            value={formData.advisor}
            onChange={handleChange}
            required
            className="input_select_text"
          />
        </div>

        {/* Advisor Email */}
        <div className="form-group">
          <label htmlFor="email_advisor">Email Advisor</label><br />
          <input
            type="email"
            id="email_advisor"
            name="email_advisor"
            value={formData.email_advisor}
            onChange={handleChange}
            required
            className="input_select_text"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="button_add" disabled={loadingSubmit}>
          {loadingSubmit ? "Submitting..." : "แก้ไขข้อมูล"}
        </button>
      </form>
      <br />
    </div>
  );
};
