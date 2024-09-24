import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Add.css";

export const Addadmin= () => {
  const [adminName, setAdminName] = useState("");

  const AddNewAdmin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAdmin = Object.fromEntries(formData.entries());
    // console.log(formEntries);
    axios
      .post("http://localhost:56733/addadmin", newAdmin)
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
    name_admin: '',
    email_admin: '',
    tel_admin: '',
    image: null, // เพิ่มฟิลด์สำหรับรูปภาพ
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
      <form onSubmit={Addadmin}>
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
          <label htmlFor="name_admin">Name Admin</label><br />
          <input className = "input_select_text"
            type="text" 
            id="name_admin" 
            name="name_admin" 
            value={formData.name_admin} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email_admin">Email</label><br />
          <input className = "input_select_text"
            type="email" 
            id="email_admin" 
            name="email_admin" 
            value={formData.email_admin} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="tel_admin">Tel</label><br />
          <input className = "input_select_text"
            type="text" 
            id="tel_admin" 
            name="tel_admin" 
            value={formData.tel_admin} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="button_add" >เพิ่ม Admin</button>
      </form>
      <br />
    </div>
  );
}