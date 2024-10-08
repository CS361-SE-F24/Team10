import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Add.css";

export const Addstudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    stdID: '',
    tel: '',
    email: '',
    degree: '',
    advisor: '',
    email_advisor: '',
    picture: null,
  });

  const [customAdvisor, setCustomAdvisor] = useState(''); // New state for custom advisor input
  const [loading, setLoading] = useState(false); // New loading state
  const [responseMessage, setResponseMessage] = useState(''); // New state for response message

  const navigate = useNavigate();

  const AddNewStudent = (event) => {
    event.preventDefault();
    setLoading(true); // Show loading
    setResponseMessage(''); // Clear previous response message

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("stdID", formData.stdID);
    formDataToSend.append("tel", formData.tel);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("degree", formData.degree);

    // Include either selected advisor or custom advisor
    const advisorToSend = formData.advisor === "Other" ? customAdvisor : formData.advisor;
    formDataToSend.append("advisor", advisorToSend);
    
    // Ensure to add custom advisor if "Other" is selected
    if (formData.advisor === "Other" && !customAdvisor) {
      alert("Please provide a custom advisor name.");
      setLoading(false); // Hide loading after error
      return;
    }

    formDataToSend.append("email_advisor", formData.email_advisor);
    formDataToSend.append("picture", formData.picture);
    
    // Log the form data to console before sending
    console.log("Form Data being sent:", {
      name: formData.name,
      stdID: formData.stdID,
      tel: formData.tel,
      email: formData.email,
      degree: formData.degree,
      advisor: advisorToSend,
      email_advisor: formData.email_advisor,
      picture: formData.picture ? formData.picture.name : null, // Log file name if present
    });

    // Send the request
    axios
      .post("http://localhost:56733/addstudent", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setResponseMessage(response.data.message); // Set the response message
        setLoading(false); // Hide loading after success
        navigate("/admin");
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
        setLoading(false); // Hide loading after error
        setResponseMessage("There was an error adding the student."); // Set error message
      });
  };

  const HandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        picture: file,
      });
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If 'Other' is selected, reset the custom advisor input
    if (name === 'advisor' && value !== 'Other') {
      setCustomAdvisor(''); // Clear custom advisor when switching advisors
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
      )}
      <div className="containers">
        {!loading && (
          <form onSubmit={AddNewStudent}>
            <div className="form-group">
              <label htmlFor="imageUpload">
                <img
                  src={formData.picture ? URL.createObjectURL(formData.picture) : 'pic.png'}
                  className="uploaded-image"
                  alt="Display"
                  style={{ cursor: 'pointer', width: '200px', height: '200px' }}
                />
              </label>
              <input
                className="input_select_text"
                id="imageUpload"
                type="file"
                accept="image/*"
                name="picture"
                onChange={HandleFileChange}
                style={{ display: 'none' }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label><br />
              <input
                className="input_select_text"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stdID">StudentID</label><br />
              <input
                className="input_select_text"
                type="text"
                id="stdID"
                name="stdID"
                value={formData.stdID}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Tel</label><br />
              <input
                className="input_select_text"
                type="text"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label><br />
              <input
                className="input_select_text"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="degree">Degree</label><br />
              <select
                className="input_select_text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              >
                <option value="">Select Degree</option>
                <option value="Master_Degree (แผน ก แบบ ก 1)">ปริญญาโทแบบ 1(แผน ก แบบ ก 1)</option>
                <option value="Master_Degree (แผน ก แบบ ก 2)">ปริญญาโทแบบ 2(แผน ก แบบ ก 2)</option>
                <option value="Master_Degree3 (แผน ข)">ปริญญาโทแบบ 3(แผน ข)</option>
                <option value="PhD">ปริญญาเอก</option>
                {/* <option value="PhD2.2">ปริญญาเอกหลักสูตรแบบ 2.2</option> */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="advisor">Teacher Advisor</label><br />
              <select
                className="input_select_text"
                id="advisor"
                name="advisor"
                value={formData.advisor}
                onChange={handleChange}
                required
              >
                <option value="">Select Advisor</option>
                <option value="Advisor Kittipich">Kittipich</option>
                <option value="Advisor Jakkarin">Jakkarin</option>
                <option value="Advisor Benjamas">Benjamas</option>
                <option value="Advisor Kamonphop">Kamonphop</option>
                <option value="Advisor Meetip">Meetip</option>
                <option value="Other">Other</option> {/* Option for custom input */}
              </select>
            </div>

            {/* Input for custom advisor name */}
            {formData.advisor === 'Other' && (
              <div className="form-group">
                <label htmlFor="customAdvisor">Enter Advisor Name</label><br />
                <input
                  className="input_select_text"
                  type="text"
                  id="customAdvisor"
                  name="customAdvisor"
                  value={customAdvisor}
                  onChange={(e) => setCustomAdvisor(e.target.value)} // Update custom advisor input
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email_advisor">Email Advisor</label><br />
              <input
                className="input_select_text"
                type="email"
                id="email_advisor"
                name="email_advisor"
                value={formData.email_advisor}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button_add">เพิ่มนักศึกษา</button>
          </form>
        )}
        {/* Displaying the response message */}
        {responseMessage && (
          <div className="response-message">
            {responseMessage}
          </div>
        )}
      </div>
    </>
  );
};
