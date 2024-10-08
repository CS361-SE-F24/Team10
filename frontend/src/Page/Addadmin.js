import React, { useState } from "react";
import axios from "axios";
import "../css/Add.css";

export const Addadmin = () => {
  const [formData, setFormData] = useState({
    name_admin: '',
    email_admin: '',
    tel_admin: '',
    pw_admin: '',
    image: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const AddNewAdmin = (event) => {
    event.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setErrorMessages({}); // Reset error messages

    const errors = {};

    // Basic validation
    if (!formData.name_admin) {
      errors.name_admin = "Name is required!";
    }
    if (!formData.email_admin) {
      errors.email_admin = "Email is required!";
    } else if (!isValidEmail(formData.email_admin)) { // Validate Email
      errors.email_admin = "Email is not valid!";
    }
    if (!formData.tel_admin) {
      errors.tel_admin = "Tel is required!";
    } else if (formData.tel_admin.length !== 10) {
      errors.tel_admin = "Tel must be 10 digits!";
    } else if (!/^\d+$/.test(formData.tel_admin)) {
      errors.tel_admin = "Tel is not valid!";
    }
    if (!formData.pw_admin) {
      errors.pw_admin = "Password is required!";
    }


    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    const newAdmin = { ...formData }; // Spread the form data

    axios
      .post("http://localhost:56733/addadmin", newAdmin)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setResponseMessage("Data sent successfully!");
        // Optionally, reset the form data here
        setFormData({
          name_admin: '',
          email_admin: '',
          tel_admin: '',
          pw_admin: '',
          image: null,
        });
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
        setLoading(false);
        setResponseMessage("There was an error sending the data.");
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result, // Store base64 of the image in formData
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="containers">
      <br />
      <form onSubmit={AddNewAdmin} noValidate>
        <div className="form-group">
          <label htmlFor="imageUpload">
            <img 
              src={formData.image || 'pic.png'} 
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
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            // required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="name_admin">Name Admin</label><br />
          <input 
            className={`input_select_text ${errorMessages.name_admin ? 'is-invalid' : ''}`}
            type="text" 
            id="name_admin" 
            name="name_admin" 
            placeholder="Enter Firstname and Lastname"
            value={formData.name_admin} 
            onChange={handleChange} 
            required 
          />
          {errorMessages.name_admin && <div className="error-message">{errorMessages.name_admin}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email_admin">Email</label><br />
          <input 
            className={`input_select_text ${errorMessages.email_admin ? 'is-invalid' : ''}`}
            type="email" 
            id="email_admin" 
            name="email_admin" 
            placeholder="Enter Email Admin"
            value={formData.email_admin} 
            onChange={handleChange} 
            required 
          />
          {errorMessages.email_admin && <div className="error-message">{errorMessages.email_admin}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="tel_admin">Tel</label><br />
          <input 
            className={`input_select_text ${errorMessages.tel_admin ? 'is-invalid' : ''}`}
            type="text" 
            id="tel_admin" 
            name="tel_admin"
            placeholder="Enter Telephone" 
            value={formData.tel_admin} 
            onChange={handleChange} 
            maxLength={10}
            required 
          />
          {errorMessages.tel_admin && <div className="error-message">{errorMessages.tel_admin}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="pw_admin">Password</label><br />
          <input 
            className={`input_select_text ${errorMessages.pw_admin ? 'is-invalid' : ''}`}
            type="password" // Change to password type for security
            id="pw_admin" 
            name="pw_admin"
            placeholder="Enter Password" 
            value={formData.pw_admin} 
            onChange={handleChange} 
            required 
          />
          {errorMessages.pw_admin && <div className="error-message">{errorMessages.pw_admin}</div>}
        </div>
        <button type="submit" className="button_add">{loading ? "Loading..." : "Add Admin"}</button>
        {responseMessage && <div className="response-message">{responseMessage}</div>} {/* Display response message */}
      </form>
      <br />
    </div>
  );
}
