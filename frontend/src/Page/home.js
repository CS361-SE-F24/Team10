import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import "../css/home.css";
import axios from "axios";
import { ProgressBar } from "../Page/progressbar.js";

export const Home = (props) => {
  const location = useLocation();
  const stdID = location.state?.stdID || props.stdID || localStorage.getItem("stdID") || "";
  const currentUser = props.currentUser || JSON.parse(localStorage.getItem("currentUser")) || { id: 0, isAdmin: false };
  const [show, setShow] = useState("progress");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]); // State to store the uploaded files

  const [formData, setFormData] = useState({
    name: "",
    stdID: stdID,
    tel: "",
    email: "",
    degree: "",
    advisor: "",
    email_advisor: "",
    image: null,
    picture: null, // Add this field to store the image
});


  useEffect(() => {
    if (stdID && !localStorage.getItem("stdID")) {
      localStorage.setItem("stdID", stdID);
    }

    const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:56733/currentstudent?stdID=${stdID}`);
          // console.log(response.data); // Log the entire response
          const studentData = response.data;
  
          // Directly assign the picture data to the state
          const picture = studentData.picture ? `data:image/jpeg;base64,${studentData.picture}` : null;
  
          // Log picture data to check conversion
          // console.log("Converted picture data:", picture);
  
          setFormData({
              name: studentData.name || "",
              stdID: stdID,
              tel: studentData.tel || "",
              email: studentData.email || "",
              degree: studentData.plan || "",
              advisor: "",
              email_advisor: "",
              image: null,
              picture: picture, // Set the picture directly
          });
          setLoading(false);
      } catch (err) {
          setError("Error fetching data");
          setLoading(false);
          console.error(err); // Log the error for debugging
      }
  };
  
    fetchData();
    fetchUploadedFiles(); // Fetch uploaded files when component mounts
  }, [stdID]);

  // Function to fetch uploaded files
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("http://localhost:56733/uploads");
      setFiles(response.data.files); // Update the state with the list of uploaded files
    } catch (err) {
      setError("Error fetching files");
    }
  };

  const handleUpdate = () => {
    setShow((prevShow) => (prevShow === "progress" ? "update" : "progress"));
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post("http://localhost:56733/uploadfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful");
      fetchUploadedFiles(); // Refresh the file list after uploading
    } catch (error) {
      setError("File upload failed");
      console.error("There was an error uploading the file!", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      <div className="sidebar">
        <h4>PhD Student</h4>
        <div className="rec">
          <div className="inside">
            {formData.picture ? (
                <img className="picture" src={formData.picture} alt="User"  /> // Adjust dimensions as needed
            ) : (
                <p>No Image Available</p>
            )}
            <p>{formData.name}</p>
            <p>รหัสนักศึกษา {formData.stdID}</p>
            <hr />
            <p>{formData.degree}</p>
          </div>

        </div>
        <br />
        <div className="advisor">
          Advisor: {formData.advisor || "Not available"}
        </div>
        <div className="email">
          Email of Advisor: {formData.email_advisor || "Not available"}
        </div>

        {currentUser.isAdmin && show === "progress" ? (
          <div>
            <button onClick={handleUpdate}>update progress</button>
          </div>
        ) : null}
      </div>

      {show === "progress" ? (
        <div className="progressbar">
          <ProgressBar />
        </div>
      ) : (
        <div>
          <form onSubmit={uploadFile} enctype="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload File</button>
          </form>

          <h3>Uploaded Files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                <a href={`http://localhost:56733/download/${file.id}`} download>{file.filename}</a>
              </li>
            ))}
          </ul>

          <button onClick={handleUpdate}>ยืนยัน</button>
        </div>
      )}
    </div>
  );
};
