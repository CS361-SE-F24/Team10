import { useLocation } from "react-router-dom";
import { React, useEffect, useState } from "react";
import "../css/home.css";
import axios from "axios";
import { ProgressBar } from "../Page/progressbar.js";
import DonutChart from "../Page/DonutChart.js";

export const Home = (props) => {
  const location = useLocation();
  const stdID =
    location.state?.stdID || props.stdID || localStorage.getItem("stdID") || "";
  const currentUser = props.currentUser ||
    JSON.parse(localStorage.getItem("currentUser")) || {
      id: 0,
      isAdmin: false,
    };
  const [show, setShow] = useState("progress");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    stdID: "",
    tel: "",
    email: "",
    degree: "",
    advisor: "",
    email_advisor: "",
    image: null,
    picture: null,
  });

  const [plan, setFormplan] = useState({
    stdID: null,
    testEng: null,
    nPublish: null,
    finishedExam: null,
    comprehensiveExam: null,
    QualifyingExam: null,
    credit: 0,
  });

  useEffect(() => {
    if (stdID && !localStorage.getItem("stdID")) {
      localStorage.setItem("stdID", stdID);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:56733/currentstudent?stdID=${stdID}`
        );
        const studentData = response.data;

        const picture = studentData.picture
          ? `data:image/jpeg;base64,${studentData.picture}`
          : null;

        setFormData({
          name: studentData.name || "",
          stdID: stdID,
          tel: studentData.tel || "",
          email: studentData.email || "",
          degree: studentData.plan || "",
          advisor: "",
          email_advisor: "",
          image: null,
          picture: picture,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
    fetchUploadedFiles();
    fetchPlan();
  }, [stdID]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:56733/uploads?stdID=${stdID}`
      );
      setFiles(response.data.files);
    } catch (err) {
      setError("Error fetching files");
    }
  };

  const fetchPlan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:56733/currentstudentplan?stdID=${stdID}`
      );
      const studentData = response.data;

      const convertFile = (fileData) => {
        if (fileData && fileData.file) {
          return {
            dataUrl: `data:${fileData.fileType};base64,${fileData.file}`,
            isImage: fileData.fileType
              ? fileData.fileType.startsWith("image")
              : false,
            isPDF: fileData.fileType === "application/pdf",
          };
        }
        return null;
      };

      setFormplan((prevPlan) => ({
        ...prevPlan,
        testEng: convertFile(studentData.testEng) || prevPlan.testEng,
        comprehensiveExam:
          convertFile(studentData.comprehension) || prevPlan.comprehensiveExam,
        QualifyingExam:
          convertFile(studentData.quality) || prevPlan.QualifyingExam,
        nPublish: studentData.nPublish,
      }));

      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
      console.error(err);
    }
  };

  const handleUpdate = () => {
    setShow((prevShow) => (prevShow === "progress" ? "update" : "progress"));
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        "http://localhost:56733/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Upload successful");
      event.target.reset();
      fetchUploadedFiles();
    } catch (error) {
      setError("File upload failed");
      console.error("Error uploading the file:", error);
    }
  };

  const editProgress = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        "http://localhost:56733/editprogress",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Progress updated successfully");
      fetchPlan();
    } catch (error) {
      setError("Progress update failed");
      console.error("Error updating progress:", error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
              <img className="picture" src={formData.picture} alt="User" />
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

        {currentUser.isAdmin && show === "progress" && (
          <div>
            <button onClick={handleUpdate}>Update Progress</button>
          </div>
        )}
      </div>

      {show === "progress" ? (
        <div className="progressbar">
          <ProgressBar stdID={stdID} />
        </div>
      ) : (
        <div className="editprogress">
          {/* Add your forms and content here as before */}
        </div>
      )}

      <button onClick={togglePopup} className="popup-button">
        Open Popup
      </button>

      {showPopup && (
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Popup Title</h2>
            <p>This is the content inside the popup.</p>
            <button onClick={togglePopup}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
};
