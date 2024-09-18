import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Add.css";

export const Addstudent = () => {
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();
  const AddNewStudent = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStudent = Object.fromEntries(formData.entries());
    console.log(newStudent);
    axios
      .post("http://localhost:56733/addstudent", newStudent)
      //เมื่อทำการ response จะเข้า then ถ้าไม่ก็จะไปเข้าcatch
      .then((response) => {
        console.log(response.data);
        alert("Data sent successfully");

        navigate("/admin");
      })
      .catch((error) => {
        console.error("There was an error sending the data!", error);
      });
  };

  const [formData, setFormData] = useState({
    name: '',
    stdID: '',
    tel: '',
    email: '',
    degree: '',
    advisor: '',
    email_advisor: '',
    image: null, // เพิ่ม field สำหรับจัดเก็บรูปภาพ
  });

  const HandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result, // จัดเก็บ base64 ของรูปภาพใน formData
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
      <form onSubmit={AddNewStudent}>
        <div className="form-group">
        <label htmlFor="imageUpload">
          <img 
            src={formData.image || 'pic.png'} 
            className="uploaded-image" 
            alt="Display"
            style={{ cursor: 'pointer', width: '150px', height: '150px' }} 
          />
        </label>
        {/* Hidden file input className = "input_select_text" */}
        <input className = "input_select_text" 
          id="imageUpload" 
          type="file" 
          accept="image/*" 
          // name="picture" 
          onChange={HandleFileChange} 
          style={{ display: 'none' }} 
          required 
        />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label><br />
          <input className = "input_select_text" 
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
          <input className = "input_select_text" 
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
          <input className = "input_select_text" 
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
          <input className = "input_select_text" 
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
          <select className = "input_select_text"
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
            <option value="PhD1.1">ปริญญาเอกหลักสูตรแบบ 1.1</option>
            <option value="PhD2.2">ปริญญาเอกหลักสูตรแบบ 2.2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="advisor">Teacher Advisor</label><br />
          <select className = "input_select_text"
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
          <input className = "input_select_text" 
            type="email" 
            id="email_advisor" 
            name="email_advisor" 
            value={formData.email_advisor} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button className = "button_add" type="submit">เพิ่มนักศึกษา</button>
      </form>
      <br />
    </div>
  );
};
