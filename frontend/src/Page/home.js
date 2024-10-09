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
  const [courses, setCourses] = useState([]);
  const [credit, setCredit] = useState(0);

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
    Complete_Course: false,
  });

  const [selectedCourses, setSelectedCourses] = useState("");
  const [courseArray, setCourseArray] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSelectedCourses(inputValue);

    // Split the input string by commas, filter out empty strings, and set the resulting array
    const courses = inputValue
      .split(",")
      .filter((course) => course.trim() !== "");
    setCourseArray(courses);
    //(courses); // Log the newly created array
  };

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
        //(studentData);

        const picture = studentData.picture
          ? `data:image/jpeg;base64,${studentData.picture}`
          : null;

        setFormData({
          name: studentData.name || "",
          stdID: stdID,
          tel: studentData.tel || "",
          email: studentData.email || "",
          degree: studentData.plan || "",
          advisor: studentData.advisor || "",
          email_advisor: studentData.advisor_email || "",
          image: null,
          picture: picture,
        });

        //(formData);

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
      // //(studentData);

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
        Complete_Course:
          studentData.complete_course || prevPlan.Complete_Course,
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
    const data = Object.fromEntries(formData.entries());
    console.log(data);

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
    //(courseArray);
    // Append Complete_Course from the plan object
    formData.append("Complete_Course", plan.Complete_Course); // Append the Complete_Course value
    formData.append("Regits_Course", courseArray);
    // Log the form data for debugging
    const data = Object.fromEntries(formData.entries());
    //("Form Data:", data);

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

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:56733/getcourses?stdID=${stdID}`
      );
      setCourses(response.data.courses);
      setCredit(response.data.credit);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      fetchCourses();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  //(progressPercentage);

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
                    <h2>Courses</h2>
                    <h2>{credit}</h2>
                    {courses.length > 0 ? (
                      <ul>
                        {courses.map((course, index) => (
                          <li
                            key={index}
                            className={
                              course.registered ? "registered" : "notregis"
                            }
                          >
                            {course.courseID} - {course.planName} (
                            {course.credit} credits)
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No courses found for this student.</p>
                    )}
                    <button onClick={togglePopup} className="close-popup">
                      Close
                    </button>
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
                    {/* <p>Uploaded File:</p> */}
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
                    {/* <p>Uploaded File:</p> */}
                    <a
                      href={`http://localhost:56733/downloadplan/${stdID}/comprehension`}
                      download
                    >
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
                    {/* <p>Uploaded File:</p> */}
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

            {/* Complete all required courses */}
            <div>
              <p>Complete Course</p>
              {plan.Complete_Course === false ? (
                <>
                  <label
                    htmlFor="Complete_Course"
                    className="editprogress_label"
                    onClick={
                      () => setFormplan({ ...plan, Complete_Course: true }) // Set Complete_Course to not pass
                    }
                  >
                    ไม่ผ่าน
                  </label>
                </>
              ) : (
                <div>
                  <label
                    onClick={
                      () => setFormplan({ ...plan, Complete_Course: false }) // Set Complete_Course to not pass
                    }
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                </div>
              )}
            </div>
            {/* Course Selection */}
            <label>เลือกตัวที่เรียน</label>
            <input
              type="text"
              // value={selectedCourses}
              onChange={handleInputChange}
              placeholder="Enter course IDs separated by commas"
            />

            <button type="submit">Save Progress</button>
          </form>
          <form onSubmit={uploadFile} enctype="multipart/form-data">
            <input type="file" name="file" />
            <br></br>
            <select name="type" required>
              <option value="journal">Journal</option>
              <option value="proceeding">Proceeding</option>
              <option value="conference">Conference</option>
            </select>
            <br></br>

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
          <button onClick={handleUpdate}>ยืนยัน</button>
        </div>
      )}
    </div>
  );
};
