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
  const [files, setFiles] = useState([]); // State to store the uploaded files
  const [progressPercentage, setProgressPercentage] = useState(0);
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
    picture: null, // Add this field to store the image
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
      console.log(studentData);

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

      // Here you can spread the previous state and update the specific fields
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
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
      console.error(err);
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
      fetchUploadedFiles(); // Refresh file list after uploading
    } catch (error) {
      setError("File upload failed");
      console.error("Error uploading the file:", error);
    }
  };

  const editProgress = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Create a FormData object
    const data = Object.fromEntries(formData.entries()); // Log the form data for debugging
    console.log("diuUfffffffff");

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:56733/editprogress",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Ensure it's multipart for file upload
        }
      );
      alert("Progress updated successfully");
      fetchPlan(); // Refresh the study plan after the update
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
        <div className="progress-bar-container">
          <div className="items-progress">
            <div className="progressbar">
              <ProgressBar
                stdID={stdID}
                onProgressUpdate={setProgressPercentage}
              />
            </div>
            <div className="DonutChart">
              <DonutChart progress={progressPercentage} />
              <div className="course"></div>
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
          </div>
        </div>
      ) : (
        <div className="editprogress">
          <form onSubmit={editProgress} enctype="multipart/form-data">
            <input type="hidden" name="stdID" value={stdID} />
            {/* Test English Section */}
            <div>
              <p>Test English</p>
              {plan.testEng === null ? (
                <>
                  <input
                    type="file"
                    id="testEng"
                    name="testEng"
                    className="editprogress_input"
                  />
                  <label htmlFor="testEng" className="editprogress_label">
                    ไม่ผ่าน
                  </label>
                </>
              ) : (
                <div>
                  <label
                    onClick={() => {
                      setFormplan({ ...plan, testEng: null }); // Set testEng to not pass
                    }}
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                  <div>
                    <p>Uploaded File:</p>
                    <a
                      href={`http://localhost:56733/downloadplan/${stdID}/testEng`}
                      download
                    >
                      TestEnglish_{stdID}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Comprehensive Exam Section */}
            <div>
              <p>Comprehensive Exam</p>
              {plan.comprehensiveExam === null ? (
                <>
                  <input
                    type="file"
                    id="comprehensiveExam"
                    name="comprehensiveExam"
                    className="editprogress_input"
                  />
                  <label
                    htmlFor="comprehensiveExam"
                    className="editprogress_label"
                  >
                    ไม่ผ่าน
                  </label>
                </>
              ) : (
                <div>
                  <label
                    onClick={
                      () => setFormplan({ ...plan, comprehensiveExam: null }) // Set comprehensiveExam to not pass
                    }
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                  <div>
                    <p>Uploaded File:</p>
                    <a href={`http://localhost:56733/downloadplan/${stdID}/comprehension`} download>
                    ComprehensiveExam_{stdID}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Qualifying Exam Section */}
            <div>
              <p>Qualifying Exam</p>
              {plan.QualifyingExam === null ? (
                <>
                  <input
                    type="file"
                    id="QualifyingExam"
                    name="QualifyingExam"
                    className="editprogress_input"
                  />
                  <label
                    htmlFor="QualifyingExam"
                    className="editprogress_label"
                  >
                    ไม่ผ่าน
                  </label>
                </>
              ) : (
                <div>
                  <label
                    onClick={
                      () => setFormplan({ ...plan, QualifyingExam: null }) // Set QualifyingExam to not pass
                    }
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                  <div>
                    <p>Uploaded File:</p>
                    <a
                      href={`http://localhost:56733/downloadplan/${stdID}/quality`}
                      download
                    >
                      QualifyingExam_{stdID}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button type="submit">Save Progress</button>
          </form>
          {/* File Upload Form */}
          <form onSubmit={uploadFile} enctype="multipart/form-data">
            <input type="file" name="file" />
            <input type="text" name="type" />
            <input type="hidden" name="stdID" value={stdID} />
            <button type="submit">Upload File</button>
          </form>

          <h3>Uploaded Files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                <a href={`http://localhost:56733/download/${file.id}`} download>
                  {file.filename}
                </a>
              </li>
            ))}
          </ul>

          <button onClick={togglePopup}>Show Popup</button>

          {/* Popup Implementation */}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={togglePopup}>&times;</span>
                <p>This is a popup message!</p>
                {/* You can add more content here */}
              </div>
            </div>
          )}

          <button onClick={handleUpdate}>ยืนยัน</button>
        </div>
      )}
    </div>
  );
};
