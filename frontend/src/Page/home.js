import { useLocation,useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import "../css/home.css";
import axios from "axios";
import { ProgressBar } from "../Page/progressbar.js";
import DonutChart from "../Page/DonutChart.js";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const Home = (props) => {
  const location = useLocation();
  const stdID =
    location.state?.stdID || props.stdID || localStorage.getItem("stdID") || "";

  const currentUser = props.currentUser ||
    JSON.parse(localStorage.getItem("currentUser")) || {
      id: 0,
      isAdmin: false,
    };
  const navigate = useNavigate();
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
    // image: null, // For uploading new image
    picture: null, // Displaying the current image fetched from API
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
    // Save stdID to localStorage if not already saved
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

        // Update formData with student data and the picture (if available)
        setFormData((prevData) => ({
          ...prevData,
          name: studentData.name || "",
          stdID: stdID,
          tel: studentData.tel || "",
          email: studentData.email || "",
          degree: studentData.plan || "",
          advisor: studentData.advisor || "",
          email_advisor: studentData.advisor_email || "",
          image: null,
          picture: picture,
        }));

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
    fetchCourses();
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

  const uptoAlumni = async () => {
    try {
      const response = await axios.post(`http://localhost:56733/uptoalumni?stdID=${stdID}`);
      console.log("Response:", response.data);
      navigate('/admin');
    } catch (error) {
      console.error("Error updating student to alumni:", error);
    }
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
      fetchCourses();
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
      {/* Display helloworld for mobile screens */}
      <div className="hidden-mobile">
        <h4>PhD Student</h4>
        <div className="sidebar-mb">
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
      </div>

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
        <br />

        {currentUser.isAdmin && show === "progress" && (
          <div>
            <button onClick={handleUpdate} className="editpro">
              แก้ไข
            </button>
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
              {currentUser.isAdmin && show === "progress" && progressPercentage === 100 &&(
                <div>
                  <button onClick={uptoAlumni}>Graduated</button>
                </div>
              )}
            </div>
            <div className="DonutChart">
              <DonutChart progress={progressPercentage} />
              <div className="course"></div><br /><br /><br />
            <div className="box">
            <p>หน่วยกิตที่ได้รับ {credit}</p>
              <button onClick={togglePopup} className="popup-button">
                หน่วยกิตที่ได้รับ
              </button>
            </div><br/>
            <div className="box2">
              การเข้าร่วมประชุม
            </div>
            {showPopup && (
              <div className="popup-modal">
                <div className="popup-content">
                  <h2>Courses</h2>
                  {/* <h2>{credit}</h2> */}
                  {courses.length > 0 ? (
                    <ul>
                      {courses.map((course, index) => (
                        <li key={index} className={course.registered ? ("registered"):("notregis")}>
                          {course.courseID} - {course.planName} (
                          {course.credit} credits{})
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
      <div className="box-edit">
        <div className="editprogress-container">
        {/* ส่วนฟอร์มการแก้ไข Progress */}
        <div className="editprogress">
          <form onSubmit={editProgress} encType="multipart/form-data">
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
                      setFormplan({ ...plan, testEng: null });
                    }}
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                  <div className="file">
                    <InsertDriveFileIcon style={{ marginRight: '8px' }} />
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
                    onClick={() =>
                      setFormplan({ ...plan, comprehensiveExam: null })
                    }
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                  <div className="file">
                    <InsertDriveFileIcon style={{ marginRight: '8px' }} />
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
                  <label htmlFor="QualifyingExam" className="editprogress_label">
                    ไม่ผ่าน
                  </label>
                </>
              ) : (
                <div>
                  <label
                    onClick={() =>
                      setFormplan({ ...plan, QualifyingExam: null })
                    }
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                <div className="file">
                  <InsertDriveFileIcon style={{ marginRight: '8px' }} />
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
                    onClick={() =>
                      setFormplan({ ...plan, Complete_Course: true })
                    }
                  >
                    ไม่ผ่าน
                  </label>
                </>
              ) : (
                <div>
                  <label
                    onClick={() =>
                      setFormplan({ ...plan, Complete_Course: false })
                    }
                    className="editprogress_label_pass"
                  >
                    ผ่าน
                  </label>
                </div>
              )}
            </div><br /><br/>
      
            {/* Course Selection */}
            <label>เลือกตัวที่เรียน</label><br /><br/>
            <input
              className="course-id"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter course IDs separated by commas"
            />
            <br/><br />
            <button className="button-save" type="submit">Save Progress</button>
          </form>
        </div>
      
        {/* ส่วนการอัปโหลดไฟล์ */}
        <div className="upload-section">
          <p>วิจัยที่ถูกตีพิมพ์</p>
          <div className="box-research">
            <form onSubmit={uploadFile} encType="multipart/form-data" className="choosefile">
              <div className="file-upload-container">
                <input type="file" id="file-upload" name="file" hidden />
                <label htmlFor="file-upload" className="file-upload-label">
                  <div className="file-upload-icon">+</div>
                  Add files
                </label>
              </div><br/>
            
              <select name="type" className="dropdown" required>
                <option value="journal">Journal</option>
                <option value="proceeding">Proceeding</option>
                <option value="conference">Conference</option>
              </select><br/>
              <input type="hidden" name="stdID" value={stdID} />
              <button type="submit" className="button-save">Upload File</button>
            </form>
          </div>

        
            <p>วิจัยทั้งหมด</p>

            {files.map((file) => (
              <div className="file">
                <InsertDriveFileIcon style={{ marginRight: '8px' }} />
                <a href={`http://localhost:56733/download/${file.id}`} download>
                  {file.filename}
                </a>
              </div>
            ))}
         
     
          
          <button onClick={handleUpdate} className="confirm">ยืนยันการแก้ไข</button>
        </div>
      </div>
    </div>
    
    )}
  </div>
);

};
