import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Add.css";

export const StudentFixinformation = () => {
  const [studentfixname, setStudentfixName] = useState("");

  const StudentFix = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStudentfix = Object.fromEntries(formData.entries());
    // console.log(formEntries);
    axios
      .post("http://localhost:56733/studentfix", newStudentfix)
      //เมื่อทำการ response จะเข้า then ถ้าไม่ก็จะไปเข้าcatch
      .then((response) => {
        console.log(response.data);
        alert("Data sent successfully");
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

  const handleFileChange = (event) => {
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
      <br />
      <form onSubmit={StudentFix}>
      <div className="form-group">
        <label htmlFor="imageUpload">
          <img 
            src={formData.image || 'pic.png'} 
            className="uploaded-image" 
            alt="Display"
            style={{ cursor: 'pointer', width: '200px', height: '200px' }} 
          />
        </label>
        <input className = "input_select_text" 
          id="imageUpload" 
          type="file" 
          accept="image/*" 
          // name="picture" 
          onChange={handleFileChange} 
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
            <option value="Master_Degree1">ปริญญาโทแบบ 1(แผน ก แบบ ก 1)</option>
            <option value="Master_Degree2">ปริญญาโทแบบ 2(แผน ก แบบ ก 2)</option>
            <option value="Master_Degree3">ปริญญาโทแบบ 2(แผน ข)</option>
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
        <button type="submit" className="button_add ">แก้ไขข้อมูล</button>
      </form>
      <br />
    </div>
  );
}

  