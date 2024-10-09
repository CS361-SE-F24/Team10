import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/progressbar.css";

export const ProgressBar = ({ stdID, onProgressUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepNames, setStepNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const getStepName = (key) => {
    switch (key) {
      case "testEng":
        return "Test English";
      case "comprehension":
        return "Comprehension";
      case "quality":
        return "Quality";
      case "publishExam":
        return "Publish Exam";
      case "ตีพิมพ์วิจัย":
        return "ตีพิมพ์วิจัย";
      default:
        return key; // Fallback to the key itself if not found
    }
  };

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

  useEffect(() => {
    const fetchStudentPlan = async () => {
      if (!stdID) return;

      try {
        const response = await axios.get(
          `http://localhost:56733/currentstudentplan?stdID=${stdID}`
        );
        const data_get = response.data;

        // Extract keys and build steps and stepNames
        const newSteps = Object.keys(data_get);
        const newStepNames = newSteps.map(getStepName);

        // Collect completed steps
        const fetchedCompletedSteps = newSteps.reduce((acc, key) => {
          if (data_get[key]) {
            acc.push(key); // Store the actual step name (e.g., 'testEng')
          }
          return acc;
        }, []);

        setSteps(newSteps);
        setStepNames(newStepNames);
        setCompletedSteps(fetchedCompletedSteps);
        setCurrentStep(
          fetchedCompletedSteps.length > 0
            ? fetchedCompletedSteps.length
            : 1
        );

        const progressPercentage = Math.floor(
          (fetchedCompletedSteps.length / newSteps.length) * 100
        );

        // Post progress percentage to the backend
        await axios.post("http://localhost:56733/updatepercent", {
          stdID,
          progressPercentage,
        });

        onProgressUpdate(progressPercentage);
      } catch (error) {
        console.error("Error fetching student plan:", error);
      }
    };

    fetchStudentPlan();
    fetchUploadedFiles(); // Fetch files when component loads
  }, [stdID, onProgressUpdate]);

  return (
    <div className="progress-bar-container vertical" style={{ flex: 1 }}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${
            completedSteps.includes(step) ? "completed" : ""
          } ${currentStep === index + 1 ? "active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <div className="circle">{index + 1}</div>
          <div className="step-name">
            {stepNames[index]}

            {/* Conditional download links based on completed steps */}
            {step === "testEng" && completedSteps.includes("testEng") && (
              <div>
                <a
                  href={`http://localhost:56733/downloadplan/${stdID}/testEng`}
                  download
                >
                  Download TestEnglish_{stdID}
                </a>
              </div>
            )}

            {step === "comprehension" &&
              completedSteps.includes("comprehension") && (
                <div>
                  <a
                    href={`http://localhost:56733/downloadplan/${stdID}/comprehension`}
                    download
                  >
                    Download Comprehension_{stdID}
                  </a>
                </div>
              )}

            {step === "quality" && completedSteps.includes("quality") && (
              <div>
                <a
                  href={`http://localhost:56733/downloadplan/${stdID}/quality`}
                  download
                >
                  Download Quality_{stdID}
                </a>
              </div>
            )}

            {/* Show file list when step is ตีพิมพ์วิจัย */}
            {stepNames[index] === "ตีพิมพ์วิจัย" && (
              files.map((file) => (
                <div>
                <a key={file.id} href={`http://localhost:56733/download/${file.id}`} download>
                  {file.filename}
                </a>
                </div>
              ))
            )}

          </div>

          {index < steps.length - 1 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
