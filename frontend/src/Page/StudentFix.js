import React, { useEffect, useState } from "react";
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
    picture: null,
  });

  const navigate = useNavigate(); 

  const fetchData = async () => {
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
        picture: studentData.picture || null, // Use studentData.picture directly
      }));
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [stdID]);

  const StudentFix = async (event) => {
    event.preventDefault();
    setLoadingSubmit(true);  
    setError(null);  

    const requiredFields = ['name', 'tel', 'email', 'advisor', 'email_advisor'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        setLoadingSubmit(false);
        return;
      }
    }

    const newStudentfix = {
      stdID: formData.stdID,
      name: formData.name,
      tel: formData.tel,
      email: formData.email,
      degree: formData.degree,
      advisor: formData.advisor,
      email_advisor: formData.email_advisor,
      picture: formData.picture ? formData.picture.split(',')[1] : null,
    };

    try {
      const response = await axios.post("http://localhost:56733/studentfix", newStudentfix, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await fetchData();  
      navigate("/admin");  
    } catch (error) {
      setError(error.response?.data?.error || "Error updating data. Please try again.");
    } finally {
      setLoadingSubmit(false);  
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          picture: reader.result, // Correct the field name here
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="loading-screen"><div className="loader"></div></div>;
  }

  return (
    <div className="containers">
      <br />
      {error && <div className="error-message">{error}</div>} 

      <form onSubmit={StudentFix}>
        <div className="form-group">
          <label htmlFor="imageUpload">
            <img
              src={formData.picture ? `data:image/png;base64,${formData.picture}` : "default-image-url.jpg"} // Use the fetched picture or a default image
              className="uploaded-image"
              alt="Student"
              style={{ cursor: 'pointer', width: '200px', height: '200px' }}
            />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
            required
            className="input_select_text"
          />
        </div>

        {/* Degree Select */}
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
