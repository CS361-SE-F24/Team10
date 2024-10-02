import React, { useState, useEffect } from "react";
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
    picture: null, // For storing the image file
  });

  const [planNames, setPlanNames] = useState([]); // State to store fetched plan names

  const navigate = useNavigate();

  // Fetch available plan names from the backend when the component mounts
  useEffect(() => {
    const fetchPlanNames = async () => {
      try {
        const response = await axios.get('http://localhost:56733/planNames'); // Adjust endpoint as needed
        setPlanNames(response.data);
      } catch (error) {
        console.error("Error fetching plan names", error);
      }
    };
    
    fetchPlanNames();
  }, []);

  const AddNewStudent = (event) => {
    event.preventDefault();

    // Use FormData to send both text and file data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("stdID", formData.stdID);
    formDataToSend.append("tel", formData.tel);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("degree", formData.degree);
    formDataToSend.append("advisor", formData.advisor);
    formDataToSend.append("email_advisor", formData.email_advisor);
    formDataToSend.append("picture", formData.picture); // Append the image file

    axios
      .post("http://localhost:56733/addstudent", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending file data
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Data sent successfully");
        navigate("/admin");
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  // Handle file selection and store it in the formData state
  const HandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        picture: file, // Store the file directly
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
  };

  return (
    <div className="containers">
      <br />
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
          <label htmlFor="degree">Plan Name</label><br />
          <select
            className="input_select_text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          >
            <option value="">Select Plan Name</option>
            {planNames.map((plan, index) => (
              <option key={index} value={plan}>{plan}</option>
            ))}
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
          </select>
        </div>
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
      <br />
    </div>
  );
};
